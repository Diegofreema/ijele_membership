'use client';
import { Card, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Wrapper } from '../Wrapper';
import { CustomHeading } from '../ui/typography';
import { Link } from 'next-view-transitions';
import { LightContainer } from '../ui/LightContainer';
import { colors } from '@/constant';

interface Props {}
const members = [
  {
    title: 'Regular',
    link: '/membership/member?membership=regular',
  },
  {
    title: 'Annual Membership',
    link: '/membership/member?membership=annual',
    img: '/y.png',
  },
  {
    title: 'Life Membership',
    link: '/membership/member?membership=life',
    img: '/l.png',
  },
  {
    title: 'Honorary Board Membership',
    link: '/membership/member?membership=honorary-board-membership',
    img: '/board.png',
  },
  {
    title: 'Honorary President',
    link: '/membership/member?membership=honorary-president',
    img: '/president.png',
  },
];
export const Membership = ({}: Props) => {
  return (
    <LightContainer>
      <Wrapper>
        <CustomHeading text="Membership Packages" mb={5} textColor="white" />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, md: 10 }}>
          {members.slice(0, 3).map((member, i) => (
            <Card
              key={i}
              height={{ base: 250, md: 300 }}
              backgroundColor="white"
              flexDir={'column'}
              overflow={'hidden'}
              alignItems={'center'}
            >
              {member.img && (
                <Image
                  alt="img"
                  width={200}
                  height={{ base: 150, md: 200 }}
                  src={member.img}
                  objectFit={'contain'}
                />
              )}
              <Flex
                flexDir={'column'}
                gap={2}
                position={'absolute'}
                bottom={4}
                left={5}
                zIndex={5}
              >
                <Text textColor="black" zIndex={5} fontWeight={'bold'}>
                  {member.title}
                </Text>
                <Link href={member.link} className="w-fit z-20">
                  <Text textColor={colors.darkBlue} fontWeight={'bold'}>
                    Learn more
                  </Text>
                </Link>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          mt={{ base: 5, md: 10 }}
          gap={{ base: 5, md: 10 }}
          pb={{ base: 10, md: 100 }}
        >
          {members.slice(3).map((member, i) => (
            <Card
              key={i}
              height={{ base: 250, md: 300 }}
              flexDir={'column'}
              position={'relative'}
              overflow={'hidden'}
              bg={'white'}
              alignItems={'center'}
            >
              {member.img && (
                <Image
                  alt="img"
                  width={200}
                  height={{ base: 150, md: 200 }}
                  src={member.img}
                  objectFit={'contain'}
                />
              )}
              <Flex
                flexDir={'column'}
                gap={2}
                position={'absolute'}
                bottom={4}
                left={5}
                zIndex={5}
              >
                <Text textColor="black" zIndex={5} fontWeight={'bold'}>
                  {member.title}
                </Text>
                <Link href={member.link} className="w-fit z-20">
                  <Text textColor={colors.darkBlue} fontWeight={'bold'}>
                    Learn more
                  </Text>
                </Link>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Wrapper>
    </LightContainer>
  );
};
