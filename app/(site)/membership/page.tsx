'use client';
import { Member } from '@/components/MemberComponent';
import { PageHeader } from '@/components/PageTitle';
import { Wrapper } from '@/components/Wrapper';
import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';

interface Props {}

const page: NextPage<Props> = ({}): JSX.Element => {
  return (
    <Box pt={{ base: 70, md: 55 }}>
      <PageHeader title="Packages" />
      <Member />
    </Box>
  );
};

export default page;
