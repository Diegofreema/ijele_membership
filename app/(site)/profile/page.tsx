import { Wrapper } from '@/components/Wrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { ProfileCard } from './_component/ProfileCard';
import { getProfile } from '@/actions/auth.action';
type Props = {};

const page = async (props: Props) => {
  const id = cookies().get('id')?.value;
  console.log({ id });

  if (!id) redirect('/sign-in');
  const user = await getProfile(id);
  console.log({ user, id });

  if (!user) redirect('/sign-in');

  return (
    <Wrapper>
      <ProfileCard user={user} />
    </Wrapper>
  );
};

export default page;
