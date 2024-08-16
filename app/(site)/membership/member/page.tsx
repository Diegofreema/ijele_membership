import { getProfile } from '@/actions/auth.action';
import { SingleMember } from '@/components/member/SingleMember';
import { cookies } from 'next/headers';

interface Props {}

const page = async ({}) => {
  const id = cookies().get('id')?.value;

  const user = await getProfile(id!);
  return <SingleMember user={user!} />;
};

export default page;
