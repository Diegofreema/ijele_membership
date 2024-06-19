'use client';
import { Box, Card, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Wrapper } from '../Wrapper';
import { CustomHeading, CustomText } from '../ui/typography';
import { Link } from 'next-view-transitions';
import { CustomButton } from '../form/CustomButton';
import { LightContainer } from '../ui/LightContainer';

interface Props {}
const members = [
  {
    title: 'Regular',
    link: '/membership/member?membership=regular',
  },
  {
    title: 'Annual Membership',
    link: '/membership/member?membership=annual',
  },
  {
    title: 'Life Membership',
    link: '/membership/member?membership=life',
  },
  {
    title: 'Honorary Board Membership',
    link: '/membership/member?membership=honorary-board-membership',
  },
  {
    title: 'Honorary President',
    link: '/membership/member?membership=honorary-president',
  },
];
export const Membership = ({}: Props) => {
  return (
    <LightContainer>
      <Wrapper>
        <CustomHeading text="Membership Packages" mb={5} />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, md: 10 }}>
          {members.slice(0, 3).map((member, i) => (
            <Card
              key={i}
              height={{ base: 250, md: 300 }}
              backgroundImage={'url("/frame.jpg")'}
              backgroundPosition={'center'}
              backgroundRepeat={'no-repeat'}
              backgroundSize={'cover'}
              flexDir={'column'}
              position={'relative'}
              overflow={'hidden'}
            >
              <Flex
                flexDir={'column'}
                gap={2}
                position={'absolute'}
                bottom={4}
                left={5}
                zIndex={5}
              >
                <Text textColor="white" zIndex={5} fontWeight={'bold'}>
                  {member.title}
                </Text>
                <Link href={member.link} className="w-fit z-20">
                  <CustomButton text="Learn More" />
                </Link>
              </Flex>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                position={'absolute'}
                top={0}
                right={0}
                left={0}
                bottom={0}
                bg="black"
                opacity={0.7}
                zIndex={1}
              />
            </Card>
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          mt={{ base: 5, md: 10 }}
          gap={{ base: 5, md: 10 }}
          pb={10}
        >
          {members.slice(3).map((member, i) => (
            <Card
              key={i}
              height={{ base: 250, md: 300 }}
              backgroundImage={'url("/frame.jpg")'}
              backgroundPosition={'center'}
              backgroundRepeat={'no-repeat'}
              backgroundSize={'cover'}
              flexDir={'column'}
              position={'relative'}
              overflow={'hidden'}
            >
              <Flex
                flexDir={'column'}
                gap={2}
                position={'absolute'}
                bottom={4}
                left={5}
                zIndex={5}
              >
                <Text textColor="white" zIndex={5} fontWeight={'bold'}>
                  {member.title}
                </Text>
                <Link href={member.link} className="w-fit z-20">
                  <CustomButton text="Learn More" />
                </Link>
              </Flex>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                position={'absolute'}
                top={0}
                right={0}
                left={0}
                bottom={0}
                bg="black"
                opacity={0.7}
                zIndex={1}
              />
            </Card>
          ))}
        </SimpleGrid>
      </Wrapper>
    </LightContainer>
  );
};
