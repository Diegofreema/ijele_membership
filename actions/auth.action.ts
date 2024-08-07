'use server';
import { addYears, format } from 'date-fns';
import VerifyEmail from '@/emails/Verify';
import {
  generateRandomString,
  hashPasswordBcrypt,
  verifyPasswordBcrypt,
} from '@/lib/helper';
import { RegisterMemberType, TypeEnums, UpdateType } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';
import ResetPassword from '@/emails/ResetPassword';
const resend = new Resend(process.env.RESEND_KEY);
const api = process.env.BASE_URL;
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  //   const hashPassword = await verifyPasswordBcrypt(password);
  //   if (!hashPassword) return { message: 'failed to create profile' };
  const { error, data } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (error) {
    console.log('Error:', error);
    return { error: error.message };
  }

  const hashPassword = await verifyPasswordBcrypt(data?.password, password);

  if (!hashPassword) {
    return { error: 'Invalid credentials' };
  }

  if (!data.verified) {
    return { error: 'not verified' };
  }
  cookies().set('id', data.user_id, { secure: true });
};

export const register = async (values: RegisterMemberType) => {
  const supabase = createClient();
  const hashedPassword = await hashPasswordBcrypt(values.password);
  if (!hashedPassword) return { error: 'Failed to create profile' };

  let userId = '';
  let isUsed = false;

  do {
    const id = generateRandomString();
    const { data: dt, error } = await supabase
      .from('users')
      .select()
      .eq('userId', id);

    if (error) {
      console.log('Error:', error);
      return { error: 'Failed to create profile' };
    }
    if (dt?.length > 0) {
      isUsed = true;
    } else if (dt?.length === 0) {
      isUsed = false;
      userId = id;
    }
  } while (isUsed);
  const { error, data } = await supabase
    .from('users')
    .insert({ ...values, password: hashedPassword, userId })
    .select()
    .single();
  if (error) {
    console.log('Error:', error.message);
    return { error: error.message };
  }
  const { error: emailError } = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: [data?.email],
    subject: 'Verify your email',
    react: VerifyEmail({
      userImage: data?.img_url as string,
      fullName: `${data?.first_name} ${data?.last_name}`,
      verificationLink: `${api}/confirm-email?id=${data?.user_id}`,
    }),
  });
  if (emailError) {
    console.log('Error:', emailError);
  }
  !emailError && redirect('/sign-in');
};
export const update = async (values: UpdateType, userId: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from('users')
    .update({ ...values })
    .eq('user_id', userId);

  if (error) {
    console.log('Error:', error.message);
    return { error: 'Failed to update' };
  }

  revalidatePath('/profile');
  redirect('/profile');
};
export const getCookies = async () => {
  return cookies().get('id')?.value;
};

export const getProfile = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('user_id', id)
    .single();
  if (error) {
    console.log(error);

    // throw new Error('Failed to get profile data');
  }
  return data;
};

export const forgotPasswordFn = async (email: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', email);

  if (error) {
    throw new Error('Failed to get send email');
  }
  if (data.length === 0) {
    return { message: 'email not found' };
  }

  if (data.length > 0) {
    const { error: emailError } = await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: [email],
      subject: 'Reset your password',
      react: ResetPassword({
        resetLink: `${api}/reset-password?id=${data[0]?.user_id}`,
      }),
    });
    return { message: 'email sent' };
  }
};

export const getAllMembers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('users').select();

  if (error) {
    throw new Error('Failed to get members');
  }
  return data;
};

export const logOut = async () => {
  cookies().delete('id');
  redirect('/');
};

export const verifyEmail = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('users')
    .update({
      verified: true,
    })
    .eq('user_id', id);
  if (error) {
    return { message: 'Failed to verify email' };
  }

  return { message: 'Email verified' };
};

export const onSub = async (id: string, type: TypeEnums) => {
  const supabase = createClient();
  const currentDate = new Date();
  const oneYearFromNow = addYears(currentDate, 1);
  const threeYearsFromNow = addYears(currentDate, 3);
  const duration =
    type === 'annual'
      ? format(oneYearFromNow, 'dd/mm/yyyy')
      : type === 'honorary-board-membership'
      ? format(threeYearsFromNow, 'dd/mm/yyyy')
      : type === 'honorary-president'
      ? format(threeYearsFromNow, 'dd/mm/yyyy')
      : null;
  const { error } = await supabase
    .from('users')
    .update({
      type: type,
      duration: duration,
    })
    .eq('user_id', id);

  if (error) {
    return { message: 'failed' };
  }

  return { message: 'success' };
};

export const resetPasswordFn = async (id: string, password: string) => {
  const hashedPassword = await hashPasswordBcrypt(password);
  if (!hashedPassword) return { message: 'Failed to change password' };
  const supabase = createClient();
  const { error } = await supabase
    .from('users')
    .update({
      password: hashedPassword,
    })
    .eq('user_id', id);

  if (error) {
    return { message: 'Failed to change password' };
  }

  return { message: 'Password changed successfully' };
};
