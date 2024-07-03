import { getProfile } from '@/actions/auth.action';
import { SingleMember } from '@/components/member/SingleMember';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {}

const page = async ({}) => {
  const id = cookies().get('id')?.value;

  const user = await getProfile(id!);
  return <SingleMember user={user!} />;
};

export default page;
