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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CustomHeading, CustomText } from '../ui/typography';
import { MemberType } from '@/types';
import { onSub } from '@/actions/auth.action';
// @ts-ignore
import {
  CompleteResponesProps,
  MonnifyProps,
  usePayWithMonnifyPayment,
  UserCancelledResponseProps,
} from 'react-monnify-ts';
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
      'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
      '⁠Exclusive Discounts: Receive exclusive shopping, travel, education, and lifestyle discounts from our corporate partners',
      '⁠Welcome Package: Receive the member welcome package when you sign up for the first time as our appreciation for your ⁠support.',
    ],
    type: 'annual',
    fee: 25000,
    img: '/y.png',
  },
  {
    packageName: 'Life Membership',
    price: 'N175,000',
    benefits: [
      'Lifetime access to club events and facilities',
      'Special recognition in club publications',
      'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
      '⁠Exclusive Discounts: Receive exclusive shopping, travel, education, and lifestyle discounts from our corporate partners',
      '⁠Welcome Package: Receive the member welcome package when you sign up for the first time as our appreciation for your ⁠support.',
    ],
    type: 'life',
    fee: 175000,
    img: '/l.png',
  },

  {
    packageName: 'Honorary Board Membership',
    price: 'N3 million (valid for 3 years)',
    benefits: [
      ' Exclusive board member privileges',
      'Invitations to VIP events and decision-making meetings',
      'Special acknowledgment on our honorary board',
      'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
      '⁠Exclusive Discounts: Receive exclusive shopping, travel, education, and lifestyle discounts from our corporate partners',
      '⁠Welcome Package: Receive the member welcome package when you sign up for the first time as our appreciation for your ⁠support.',
    ],
    type: 'honorary-board-membership',
    fee: 3000000,
    img: '/board.png',
  },
  {
    packageName: 'Honorary President',
    price: 'N5 million (valid for 2 years)',
    benefits: [
      'Prestigious title of Honorary President',
      ' Leadership role in club initiatives',
      'Comprehensive VIP benefits and high-profile recognition',
      'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
      '⁠Exclusive Discounts: Receive exclusive shopping, travel, education, and lifestyle discounts from our corporate partners',
      '⁠Welcome Package: Receive the member welcome package when you sign up for the first time as our appreciation for your ⁠support.',
    ],
    type: 'honorary-president',
    fee: 5000000,
    img: '/president.png',
  },
];

export const SingleMember = ({ user }: { user: MemberType }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const memberships = searchParams.get('membership');

  const singleMember = useMemo(
    () => packages.find((p) => p.type === memberships),
    [memberships]
  );

  const onLoadStart = () => {
    console.log('loading has started');
  };
  const onLoadComplete = () => {
    console.log('SDK is UP');
  };

  const onComplete = (res: CompleteResponesProps) => {
    //Implement what happens when the transaction is completed.
    console.log('response', res);
    // @ts-ignore
    onSub(user?.user_id, singleMember?.type).then((res) => {
      if (res.message === 'failed') {
        toast({
          title: 'Error',
          description: 'Failed to complete transaction',
          position: 'top-right',
          duration: 5000,
          status: 'error',
        });
      }

      if (res.message === 'success') {
        toast({
          title: 'Success',
          description: 'Transaction completed',
          position: 'top-right',
          duration: 5000,
          status: 'success',
        });
      }
    });
  };
  const onClose = (data: UserCancelledResponseProps) => {
    //Implement what should happen when the modal is closed here
    console.log('data', data);
    toast({
      title: 'Transaction failed',
      description: 'Payment cancelled by user',
      position: 'top-right',
      duration: 5000,
      status: 'error',
    });
  };
  const config: MonnifyProps = {
    amount: singleMember?.fee!,
    currency: 'NGN',
    reference: `${new String(new Date().getTime())}`,
    customerName: user?.first_name + ' ' + user?.last_name,
    customerEmail: user?.email,
    apiKey: process.env.MONNIFY!,
    contractCode: '7717054880',
    paymentDescription: 'Membership registration',
    metadata: {
      name: user?.first_name + ' ' + user?.last_name,
    },
    isTestMode: false,
    customerPhoneNumber: user?.phoneNumber!,
  };

  const initializePayment = usePayWithMonnifyPayment(config);
  const onPay = () => {
    if (!user?.id) {
      router.push('/sign-in');
      toast({
        title: 'Sign in',
        description: 'Please in to continue',
        status: 'info',
        position: 'top-right',
        duration: 5000,
      });
      return;
    }
    initializePayment(onLoadStart, onLoadComplete, onComplete, onClose);
  };
  return (
    <Flex
      py={{ base: 120, md: 150 }}
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
        <PremiumCard
          packageName={singleMember?.packageName!}
          img={singleMember?.img}
        />
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
          <CustomHeading
            text={singleMember?.price!}
            mb={5}
            textColor={'black'}
          />

          <CustomText text="Benefits includes" textColor={'black'} />
          {singleMember?.benefits.map((text, i) => (
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
              onClick={() => router.back()}
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
              onClick={onPay}
              _hover={{
                bg: colors.lightBlue,
                transition: { duration: 0.3, ease: 'easeIn' },
              }}
              bg={colors.darkBlue}
              color={'white'}
              width={'100%'}
            >
              Pay
            </Button>
          </Flex>
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

const PremiumCard = ({
  packageName,
  img,
}: {
  packageName: string;
  img?: string;
}) => {
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
        {img && (
          <Image
            alt="logo"
            src={img}
            width={200}
            height={200}
            objectFit={'contain'}
          />
        )}
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

// const Benefits = ({
//   benefits,
//   price,
//   onPay,
//   componentProps,
// }: {
//   benefits: string[];
//   price: string;
//   onPay: () => void;
//   componentProps: any;
// }) => {
//   const color = useColorModeValue('white', colors.dark);
//   const router = useRouter();
//   const onBack = () => {
//     router.back();
//   };
//   return (
//     <Box
//       as={motion.div}
//       initial={{ opacity: 0, x: 50 }}
//       whileInView={{
//         opacity: 1,
//         x: 0,
//         transition: { duration: 0.3, ease: 'easeIn' },
//       }}
//       display={'flex'}
//       flexDir={'column'}
//       gap={5}
//       viewport={{ once: true }}
//     >
//       <CustomHeading text={price} mb={5} textColor={'black'} />

//       <CustomText text="Benefits includes" textColor={'black'} />
//       {benefits.map((text, i) => (
//         <Flex key={i} gap={3} alignItems={'center'}>
//           <Check color={colors.darkBlue} size={20} />
//           <Text
//             textColor={'black'}
//             fontWeight={'500'}
//             fontFamily={'var(--font-rubik)'}
//           >
//             {text}
//           </Text>
//         </Flex>
//       ))}

//       <Flex gap={5}>
//         <Button
//           onClick={onBack}
//           _hover={{
//             bg: colors.lightBlue,
//             transition: { duration: 0.3, ease: 'easeIn' },
//           }}
//           bg={colors.darkBlue}
//           color={'white'}
//           width={'100%'}
//         >
//           Go back
//         </Button>
//         <PaystackConsumer {...componentProps}>
//           {({ initializePayment }) => (
//             <button
//               onClick={() => initializePayment(handleSuccess, handleClose)}
//             >
//               Paystack Consumer Implementation
//             </button>
//           )}
//         </PaystackConsumer>
//         <Button
//           onClick={onPay}
//           // {...componentProps}
//           className="w-full bg-[#e9c365] text-white rounded-md"
//         >
//           Register
//         </Button>
//       </Flex>
//     </Box>
//   );
// };
