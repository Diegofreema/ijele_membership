'use client';
import { DarkContainer } from '@/components/ui/DarkContainer';
import { colors } from '@/constant';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  ListItem,
  UnorderedList,
  Flex,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'next-view-transitions';

const packages = [
  {
    packageName: 'Regular Membership',
    price: 'Free',
    benefits: ['Access to limited discounts and member benefits'],
    link: '/membership/member?membership=regular',
  },
  {
    packageName: 'Annual Membership',
    price: 'N25,000',
    benefits: [
      'Annual access to club events and facilities',
      'Priority booking for events and programs',
    ],
    link: '/membership/member?membership=annual',
    img: '/year.png',
  },
  {
    packageName: 'Life Membership',
    price: 'N175,000',
    benefits: [
      'Lifetime access to club events and facilities',
      'Special recognition in club publications',
    ],
    link: '/membership/member?membership=life',
    img: '/life.png',
  },

  {
    packageName: 'Honorary Board Membership',
    price: 'N3 million (valid for 3 years)',
    benefits: [
      ' Exclusive board member privileges',
      'Invitations to VIP events and decision-making meetings',
      'Special acknowledgment on our honorary board',
    ],
    link: '/membership/member?membership=honorary-board-membership',
    img: '/board.png',
  },
  {
    packageName: 'Honorary President',
    price: 'N5 million (valid for 2 years)',
    benefits: [
      'Prestigious title of Honorary President',
      ' Leadership role in club initiatives',
      'Comprehensive VIP benefits and high-profile recognition',
    ],
    link: '/membership/member?membership=honorary-president',
    img: '/president.png',
  },
];

export const Member = (): JSX.Element => {
  return (
    <Box>
      <WriteUp />
      <DarkContainer height={'auto'}>
        <Box
          width={{ base: '90%', md: '60%' }}
          mx={'auto'}
          display={'flex'}
          flexDirection={'column'}
          gap={{ base: 5, md: 10 }}
        >
          {packages.map((pkg, i) => (
            <PremiumCards key={i} {...pkg} />
          ))}
        </Box>
      </DarkContainer>
    </Box>
  );
};

const exclusives = [
  'VIP Access to Events: Enjoy priority seating and special invitations to all club events.',
  'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
  'Networking Opportunities: Connect with fellow members, athletes, and industry leaders through special events and gatherings.',
  'Early Access to Club News: Be the first to receive updates on club activities, new programs, and initiatives.',
  'Recognition: Get acknowledged in club publications and at events for your support and contributions.',
  'By becoming a member, you are not only supporting the club’s growth but also gaining unparalleled access to a community dedicated to excellence in sports, culture, and entertainment.',
];

const WriteUp = () => {
  const color = useColorModeValue(colors.dark, 'white');
  return (
    <Box
      mt={{ base: 100, md: 10 }}
      mb={{ base: 10, md: 20 }}
      as={motion.div}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      width={{ base: '90%', md: '60%' }}
      mx={'auto'}
      display={'flex'}
      flexDir={'column'}
      gap={3}
    >
      <Heading as={'h5'} size="md" textColor={color}>
        To achieve our vision and support our growth, we offer a variety of
        membership packages designed to provide exclusive benefits and
        privileges,please check them below.
      </Heading>
      <Heading as={'h5'} size="base" textColor={color}>
        Exclusive Member Benefits
      </Heading>
      <Text textColor={color}>
        Joining Ijele Sports Club comes with a host of exclusive benefits
        designed to enhance your experience and involvement.
      </Text>
      <UnorderedList>
        {exclusives.map((text, i) => (
          <ListItem key={i} textColor={color} fontStyle={'italic'}>
            {text}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

type PackageProps = {
  packageName: string;
  benefits: string[];
  price: string;
  link: string;
  img?: string;
};

const PremiumCards = ({
  packageName,
  benefits,
  price,
  link,
  img,
}: PackageProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 10 }}>
      <PremiumCard packageName={packageName} price={price} img={img} />
      <Benefits benefits={benefits} link={link} />
    </SimpleGrid>
  );
};

const PremiumCard = ({
  packageName,
  price,
  img,
}: {
  packageName: string;
  price: string;
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
          {price}
        </Text>
      </CardBody>
    </Card>
  );
};

const Benefits = ({ benefits, link }: { benefits: string[]; link: string }) => {
  const color = useColorModeValue('white', colors.dark);

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
      justifyContent={'center'}
      gap={5}
      viewport={{ once: true }}
    >
      {benefits.map((text, i) => (
        <Flex key={i} gap={3} alignItems={'center'}>
          <Check color={colors.darkBlue} size={20} />
          <Text
            textColor={'white'}
            fontWeight={'500'}
            fontFamily={'var(--font-rubik)'}
          >
            {text}
          </Text>
        </Flex>
      ))}

      <Link href={link} className="w-full">
        <Button
          _hover={{
            bg: colors.lightBlue,
            transition: { duration: 0.3, ease: 'easeIn' },
          }}
          bg={colors.darkBlue}
          color={'white'}
          width={'100%'}
        >
          Join
        </Button>
      </Link>
    </Box>
  );
};
