import { SingleMember } from '@/components/member/SingleMember';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {}

const page: NextPage<Props> = ({}): JSX.Element => {
  const id = cookies().get('id')?.value;
  if (!id) redirect('/sign-in');
  return <SingleMember />;
};

export default page;
