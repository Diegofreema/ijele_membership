'use server';

import VerifyEmail from '@/emails/Verify';
import {
  generateRandomString,
  hashPasswordBcrypt,
  verifyPasswordBcrypt,
} from '@/lib/helper';
import { MemberType, RegisterMemberType } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
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
  redirect('/profile');
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
    from: '<onboarding@resend.dev>',
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
  redirect('/sign-in');
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
    throw new Error('Failed to get profile data');
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
