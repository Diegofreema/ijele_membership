'use client';
import { MemberType } from '@/types';
import { Wrapper } from '../Wrapper';
import { LightContainer } from '../ui/LightContainer';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { CustomHeading } from '../ui/typography';
import { CustomButton } from '../form/CustomButton';
import { Link } from 'next-view-transitions';
import { useMemo } from 'react';
import { MemberCard } from './MemberCard';
import { colors } from '@/constant';

type Props = {
  members: MemberType[];
};

export const AllMembers = ({ members }: Props): JSX.Element => {
  const regular = useMemo(
    () => members?.filter((m) => m.type === 'regular'),
    [members]
  );
  const president = useMemo(
    () => members?.filter((m) => m.type === 'honorary-president'),
    [members]
  );
  const board = useMemo(
    () => members?.filter((m) => m.type === 'honorary-board-membership'),
    [members]
  );
  const life = useMemo(
    () => members?.filter((m) => m.type === 'life'),
    [members]
  );
  const annual = useMemo(
    () => members?.filter((m) => m.type === 'annual'),
    [members]
  );
  return (
    <LightContainer>
      <Wrapper>
        {members.length === 0 && (
          <Flex
            flexDir={'column'}
            gap={5}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box>
              <CustomHeading
                textColor={'white'}
                text="We have not members yet"
                textAlign={'center'}
              />
              <CustomHeading
                textColor={'white'}
                text="Be our first member"
                textAlign={'center'}
              />
            </Box>
            <Link href={'/membership'}>
              <CustomButton text="join" bg={colors.brown} width={200} />
            </Link>
          </Flex>
        )}
        {members?.length > 0 && (
          <Box display={'flex'} flexDir={'column'} gap={10}>
            {president.length > 0 && (
              <MembersPart members={president} title="Honorary President" />
            )}
            {board.length > 0 && (
              <MembersPart members={board} title="Honorary Board Membership" />
            )}
            {life.length > 0 && (
              <MembersPart members={life} title="Life Membership" />
            )}
            {annual.length > 0 && (
              <MembersPart members={annual} title="Annual Membership" />
            )}
            {regular.length > 0 && (
              <MembersPart members={regular} title="Regular Membership" />
            )}
          </Box>
        )}
      </Wrapper>
    </LightContainer>
  );
};

const MembersPart = ({ members, title }: Props & { title: string }) => {
  return (
    <Box display={'flex'} flexDir={'column'} gap={{ base: 5 }} mb={7}>
      <CustomHeading textColor={'black'} text={title} />
      <SimpleGrid columns={{ base: 1, md: 4 }}>
        {members.map((member, index) => (
          <MemberCard member={member} key={member?.user_id} index={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
