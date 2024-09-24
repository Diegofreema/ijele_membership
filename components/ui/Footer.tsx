'use client';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useColorModePreference,
  useColorModeValue,
} from '@chakra-ui/react';
import { DarkContainer } from './DarkContainer';
import { Link } from 'next-view-transitions';
import { colors } from '@/constant';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

interface Props {}

const links = [
  {
    label: 'News',
    subLinks: [
      {
        label: 'Ijele News',
        href: '/news',
      },
      {
        label: 'Ijele Tv',
        href: '/tv',
      },
    ],
  },
  {
    label: 'Football',
    subLinks: [
      {
        label: 'Our team',
        href: '/football/our-team',
      },
      // {
      //   label: "Women's first team",
      //   href: '/football/women-teams',
      // },
      // {
      //   label: 'Academy',
      //   href: '/football/academy',
      // },
    ],
  },
  {
    label: 'Other sports',
    subLinks: [
      {
        label: 'Basketball',
        href: '/basketball',
      },
    ],
  },
  {
    label: 'Online store',
    subLinks: [
      {
        label: 'Jerseys',
        href: '/store/jerseys',
      },
      {
        label: 'New arrivals',
        href: '/store/new-arrivals',
      },
    ],
  },
  {
    label: 'Club',
    subLinks: [
      {
        label: 'About us',
        href: '/about-us',
      },
    ],
  },
];
export const Footer = ({}: Props) => {
  const color = useColorModeValue('white', colors.black);
  return (
    <DarkContainer height={{ base: '100dvh', md: '300px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 5 }}
        gap={5}
        width={{ base: '90%', md: '70%' }}
        mx={'auto'}
        mt={{ base: 50, md: 0 }}
      >
        {links.map((link) => (
          <Box display={'flex'} flexDir={'column'} gap={5} key={link.label}>
            <Text
              textColor={'white'}
              fontSize={{ base: 20, md: 25 }}
              fontWeight={'bold'}
              fontFamily={'var(--font-rubik)'}
            >
              {link.label}
            </Text>
            <Box display={'flex'} flexDir={'column'} gap={5}>
              {link.subLinks.map((subLink) => (
                <Link href={subLink.href} key={subLink.href} className="w-fit">
                  <Text
                    as={motion.p}
                    initial={{ x: 0 }}
                    whileHover={{
                      x: 20,

                      transition: {
                        type: 'spring',
                      },
                    }}
                    viewport={{ once: true }}
                    key={subLink.label}
                    textColor={'white'}
                    fontSize={{ base: 15, md: 18 }}
                    fontWeight={'400'}
                    fontFamily={'var(--font-rubik)'}
                  >
                    {subLink.label}
                  </Text>
                </Link>
              ))}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <FooterLinks />
    </DarkContainer>
  );
};

const socialLinks = [
  {
    href: 'https://www.instagram.com/ijelesportsclub?igsh=aXdoc3Y1bnB3YmJo',
    icon: FaInstagram,
  },
  {
    href: 'https://twitter.com/ijelesportsclub?s=11',
    icon: FaTwitter,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61560226838987',
    icon: FaFacebook,
  },
];

const FooterLinks = () => {
  return (
    <Flex
      gap={5}
      mt={5}
      justifyContent={{ base: 'center', md: 'flex-start' }}
      pb={{ base: 20, md: 50 }}
      width={{ base: '90%', md: '70%' }}
      mx="auto"
    >
      {socialLinks.map(({ href, icon: CustomIcon }) => (
        <Link href={href} key={href} target="_blank">
          <IconButton
            bg="transparent"
            aria-label="icon"
            color={'white'}
            icon={<Icon as={CustomIcon} boxSize={5} />}
          />
        </Link>
      ))}
    </Flex>
  );
};
