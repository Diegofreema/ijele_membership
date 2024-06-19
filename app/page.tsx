import { Wrapper } from '@/components/Wrapper';
import { Benefits } from '@/components/home/Benifts';
import { Landing } from '@/components/home/Landing';
import { Membership } from '@/components/home/Membership';
import { NextPage } from 'next';

interface Props {}

const page: NextPage<Props> = ({}): JSX.Element => {
  return (
    <div>
      <Landing />
      <Benefits />
      <Membership />
    </div>
  );
};

export default page;
