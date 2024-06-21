import { getAllMembers } from '@/actions/auth.action';
import { PageHeader } from '@/components/PageTitle';
import { AllMembers } from '@/components/member/AllMembers';
import { MemberType } from '@/types';

const page = async () => {
  const allMembers = await getAllMembers();
  return (
    <div className="pt-[100px] sm:pt-[55px]">
      <PageHeader title="Members" />
      <AllMembers members={allMembers} />
    </div>
  );
};

export default page;
