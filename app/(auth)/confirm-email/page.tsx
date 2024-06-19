import { supabase } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  let loading = true;
  let errorVerifying = false;
  const { error } = await supabase
    .from('users')
    .update({
      verified: true,
    })
    .eq('user_id', searchParams.id);

  loading = false;
  let text = '';
  if (error) {
    errorVerifying = true;
  }

  if (loading) {
    text = 'Verifying...';
  }

  if (errorVerifying) {
    text = 'Error verifying your email please try again';
  }

  if (!loading && !errorVerifying) {
    text = 'Your email has already been verified, please login in';
    return redirect('/sign-in');
  }

  return (
    <div className="flex h-screen justify-center items-center space-y-3">
      <h1 className="text-black text-center">Verify your email.</h1>
      <h4 className="text-black text-center">{text}</h4>
    </div>
  );
};

export default page;
