'use server';

import VerifyEmail from '@/emails/Verify';
import { hashPasswordBcrypt, verifyPasswordBcrypt } from '@/lib/helper';
import { MemberType, RegisterMemberType } from '@/types';
import { supabase } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const api = process.env.BASE_URL;
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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
  cookies().set('id', data.user_id);
  redirect('/profile');
};

export const register = async (values: RegisterMemberType) => {
  const hashedPassword = await hashPasswordBcrypt(values.password);
  if (!hashedPassword) return { error: 'Failed to create profile' };
  const { error, data } = await supabase
    .from('users')
    .insert({ ...values, password: hashedPassword })
    .select()
    .single();
  if (error) {
    return { error: error.message };
  }
  await resend.emails.send({
    from: '<onboarding@resend.dev>',
    to: [data?.email],
    subject: 'Verify your email',
    react: VerifyEmail({
      userImage: data?.img_url as string,
      fullName: `${data?.first_name} ${data?.last_name}`,
      verificationLink: `${api}/confirm-email?id=${data?.user_id}`,
    }),
  });
  redirect('/sign-in');
};

export const getCookies = async () => {
  return cookies().get('id')?.value;
};

export const logOut = async () => {
  cookies().delete('id');
  redirect('/');
};
