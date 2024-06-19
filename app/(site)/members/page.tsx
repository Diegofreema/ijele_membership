import { PageHeader } from '@/components/PageTitle';
import { AllMembers } from '@/components/member/AllMembers';
import { MemberType } from '@/types';

const page = () => {
  const allMembers: MemberType[] = [];
  return (
    <div className="pt-[100px] sm:pt-[55px]">
      <PageHeader title="Members" />
      <AllMembers members={allMembers} />
    </div>
  );
};

export default page;
