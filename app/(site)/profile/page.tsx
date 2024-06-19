import { Wrapper } from '@/components/Wrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const page = async (props: Props) => {
  const id = cookies().get('id')?.value;
  if (!id) redirect('/sign-in');
  return <Wrapper>page</Wrapper>;
};

export default page;
