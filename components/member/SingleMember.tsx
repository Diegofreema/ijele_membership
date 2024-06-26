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
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { CustomHeading, CustomText } from '../ui/typography';
import { usePaystackPayment, PaystackButton } from 'react-paystack';
import { MemberType } from '@/types';
import { onSub } from '@/actions/auth.action';

const packages = [
  {
    packageName: 'Regular Membership',
    price: 'Free',
    benefits: ['Access to limited discounts and member benefits'],
    type: 'regular',
    fee: 0,
  },
  {
    packageName: 'Annual Membership',
    price: 'N25,000',
    benefits: [
      'Annual access to club events and facilities',
      'Priority booking for events and programs',
    ],
    type: 'annual',
    fee: 25000,
  },
  {
    packageName: 'Life Membership',
    price: 'N175,000',
    benefits: [
      'Lifetime access to club events and facilities',
      'Special recognition in club publications',
    ],
    type: 'life',
    fee: 175000,
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
    fee: 3000000,
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
    fee: 5000000,
  },
];

export const SingleMember = ({ user }: { user: MemberType }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const memberships = searchParams.get('membership');

  const singleMember = useMemo(
    () => packages.find((p) => p.type === memberships),
    [memberships]
  );
  const onSuccess = useCallback(async () => {
    toast({
      title: 'Processing',
      description: `Please be patient...`,
      status: 'loading',
      position: 'top-right',
    });
    const { message } = await onSub(user.user_id, singleMember?.type as any);
    if (message === 'Failed to complete registration') {
      toast({
        title: 'Error',
        description: `Failed to complete registration process`,
        status: 'error',
        position: 'top-right',
      });
    }
    if (message === 'success') {
      toast({
        title: 'Welcome to the family',
        description: `You are not part of the Ijele SC`,
        status: 'success',
        position: 'top-right',
      });
    }
  }, [toast, singleMember?.type, user.user_id]);

  const onClose = useCallback(() => {
    toast({
      title: 'Oops!',
      description: `You are cancelled the transaction`,
      status: 'info',
      position: 'top-right',
    });
  }, [toast]);
  const componentProps = {
    email: user.email,
    amount: singleMember?.fee! * 100,
    metadata: {
      name: user.first_name + ' ' + user.last_name,
      phone: user.phoneNumber,
    },
    publicKey: 'pk_test_52f4b5b31fa901229f5d3e2a1641d7477aacf092',
    text: 'Register',
    onSuccess: () => onSuccess(),
    onClose: () => onClose(),
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: singleMember?.fee! * 100,
    publicKey: 'pk_test_52f4b5b31fa901229f5d3e2a1641d7477aacf092',
  };
  const initializePayment = usePaystackPayment(config);

  const onPay = () => {
    console.log('dggfd');

    // initializePayment({ onSuccess, onClose });
  };

  return (
    <Flex
      py={{ base: 100, md: 50 }}
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
          onPay={onPay}
          componentProps={componentProps}
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
  onPay,
  componentProps,
}: {
  benefits: string[];
  price: string;
  onPay: () => void;
  componentProps: any;
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
        <PaystackButton
          {...componentProps}
          className="w-full bg-[#e9c365] text-white rounded-md"
        />
      </Flex>
    </Box>
  );
};
