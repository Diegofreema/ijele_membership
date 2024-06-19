'use client';
import { colors } from '@/constant';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CustomHeading, CustomText } from '../ui/typography';

const packages = [
  {
    packageName: 'Regular Membership',
    price: 'Free',
    benefits: ['Access to limited discounts and member benefits'],
    type: 'regular',
  },
  {
    packageName: 'Annual Membership',
    price: 'N25,000',
    benefits: [
      'Annual access to club events and facilities',
      'Priority booking for events and programs',
    ],
    type: 'annual',
  },
  {
    packageName: 'Life Membership',
    price: 'N175,000',
    benefits: [
      'Lifetime access to club events and facilities',
      'Special recognition in club publications',
    ],
    type: 'life',
  },

  {
    packageName: 'Honorary Board Membership',
    price: 'N3 million (valid for 3 years)',
    benefits: [
      ' Exclusive board member privileges',
      'Invitations to VIP events and decision-making meetings',
      'Special acknowledgment on our honorary board',
    ],
    type: 'honorary-board-membership',
  },
  {
    packageName: 'Honorary President',
    price: 'N5 million (valid for 3 years)',
    benefits: [
      'Prestigious title of Honorary President',
      ' Leadership role in club initiatives',
      'Comprehensive VIP benefits and high-profile recognition',
    ],
    type: 'honorary-president',
  },
];
export const SingleMember = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberships = searchParams.get('membership');
  if (!memberships) router.back();
  const singleMember = useMemo(
    () => packages.find((p) => p.type === memberships),
    [memberships]
  );
  return (
    <Flex
      py={50}
      minHeight={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <SimpleGrid
        width={{ base: '90%', md: '70%' }}
        mx={'auto'}
        columns={{ base: 1, md: 2 }}
        gap={{ base: 5, md: 10 }}
      >
        <PremiumCard packageName={singleMember?.packageName!} />
        <Benefits
          benefits={singleMember?.benefits!}
          price={singleMember?.price!}
        />
      </SimpleGrid>
    </Flex>
  );
};

const PremiumCard = ({ packageName }: { packageName: string }) => {
  const bg = useColorModeValue(colors.darkBlue, colors.dark);
  const color = useColorModeValue(colors.dark, 'white');
  return (
    <Card
      bg={bg}
      as={motion.div}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      }}
      viewport={{ once: true }}
    >
      <CardBody
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={5}
      >
        <Image
          alt="logo"
          src="/logo.png"
          width={50}
          height={50}
          objectFit={'contain'}
        />
        <Heading textColor={'white'} size={{ base: 'base', md: '"md"' }}>
          {packageName}
        </Heading>
        <Text textColor={'white'} fontFamily={'var(--font-belleza)'}>
          {'Membership'}
        </Text>
      </CardBody>
    </Card>
  );
};

const Benefits = ({
  benefits,
  price,
}: {
  benefits: string[];
  price: string;
}) => {
  const color = useColorModeValue('white', colors.dark);
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      }}
      display={'flex'}
      flexDir={'column'}
      gap={5}
      viewport={{ once: true }}
    >
      <CustomHeading text={price} mb={5} textColor={'black'} />

      <CustomText text="Benefits includes" textColor={'black'} />
      {benefits.map((text, i) => (
        <Flex key={i} gap={3} alignItems={'center'}>
          <Check color={colors.darkBlue} size={20} />
          <Text
            textColor={'black'}
            fontWeight={'500'}
            fontFamily={'var(--font-rubik)'}
          >
            {text}
          </Text>
        </Flex>
      ))}

      <Flex gap={5}>
        <Button
          onClick={onBack}
          _hover={{
            bg: colors.lightBlue,
            transition: { duration: 0.3, ease: 'easeIn' },
          }}
          bg={colors.darkBlue}
          color={'white'}
          width={'100%'}
        >
          Go back
        </Button>
        <Button
          _hover={{
            bg: colors.lightBlue,
            transition: { duration: 0.3, ease: 'easeIn' },
          }}
          bg={colors.brown}
          color={'white'}
          width={'100%'}
        >
          Register
        </Button>
      </Flex>
    </Box>
  );
};
