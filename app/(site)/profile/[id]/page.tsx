import { Wrapper } from '@/components/Wrapper';
import React from 'react';

import { EditForm } from '../_component/EditForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getProfile } from '@/actions/auth.action';
import { MemberType } from '@/types';

type Props = {};

const page = async (props: Props) => {
  const id = cookies().get('id')?.value;
  if (!id) redirect('/sign-in');
  const user = await getProfile(id);

  return (
    <Wrapper>
      <EditForm user={user} />
    </Wrapper>
  );
};

export default page;
