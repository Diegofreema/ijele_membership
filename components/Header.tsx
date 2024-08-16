'use client';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  ResponsiveValue,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'next-view-transitions';
import { Moon, Sun, MenuIcon } from 'lucide-react';
// import { MobileDrawer } from './MobileNav';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { colors } from '@/constant';
import { CustomButton } from './form/CustomButton';
import { logOut } from '@/actions/auth.action';
import { MobileDrawer } from './ui/MobileDrawer';
import { useRef } from 'react';
import { useMember } from '@/public/hooks/useMember';

interface Props {
  id: string | undefined;
}
export const links = [
  {
    href: 'https://www.ijelesportsclub.ng',
    label: 'Ijele SC',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
  {
    href: '/membership',
    label: 'Membership',
  },
  // {
  //   href: '/members',
  //   label: 'Notable Members',
  // },
];
export const Header = ({ id: userId }: Props) => {
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  const { isMember } = useMember({ id: userId });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onLogOut = async () => {
    await logOut();
  };

  const buttonText =
    isMember === null ? ' Join as a Member' : 'Upgrade Membership';
  return (
    <Box
      as={motion.div}
      initial={{ y: -20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, type: 'spring', damping: 9 },
      }}
      viewport={{ once: true }}
      bg={bg}
      position={'fixed'}
      top={0}
      right={0}
      left={0}
      zIndex={555}
      width={'100%'}
    >
      <Flex
        p={5}
        maxWidth={{ base: '90%', md: '80%' }}
        mx={'auto'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Link href="/">
          <Image
            alt="logo"
            src="/logo.png"
            width={50}
            height={50}
            objectFit={'contain'}
          />
        </Link>

        <Flex alignItems={'center'} gap={5} hideBelow={'md'}>
          <Links />
          {userId ? (
            <CustomButton
              color="white"
              bg="transparent"
              text="Log out"
              onClick={onLogOut}
            />
          ) : (
            <AuthButtons />
          )}
          <Link href="/membership">
            <Button
              bg={colors.brown}
              color={'black'}
              width={'fit-content'}
              px={10}
              borderRadius={10}
            >
              {buttonText}
            </Button>
          </Link>
        </Flex>
        <MobileDrawer
          userId={userId}
          onLogOut={onLogOut}
          isOpen={isOpen}
          onClose={onClose}
        />
        <IconButton
          hideFrom="md"
          onClick={onOpen}
          aria-label="button"
          icon={<MenuIcon />}
        />
      </Flex>
    </Box>
  );
};

export const Links = ({
  flexDirection = 'row',
  onClose,
}: {
  flexDirection?: 'row' | 'column' | ResponsiveValue<'row' | 'column'>;
  onClose?: () => void;
}) => {
  const pathname = usePathname();
  const color = useColorModeValue('black', 'white');
  const onPress = (e: any) => {
    e.stopPropagation();
    onClose && onClose();
  };

  return (
    <Flex gap={5} hideBelow={'md'} flexDirection={flexDirection}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} onClick={onPress} className="group">
            <Text
              className="group-hover:text-[#8ad5e7] transition duration-150 group-hover:-translate-y-1"
              fontFamily={'var(--font-rubik)'}
              textColor={isActive ? colors.lightBlue : 'white'}
              fontWeight={'bold'}
            >
              {label}
            </Text>
          </Link>
        );
      })}
    </Flex>
  );
};

export const ToggleDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('#181818', 'white');
  const color = useColorModeValue('white', '#181818');

  return (
    <Button
      hideBelow={'md'}
      borderRadius={50}
      width={50}
      height={50}
      bg={bg}
      onClick={toggleColorMode}
    >
      {colorMode === 'light' ? <Sun color={color} /> : <Moon color={color} />}
    </Button>
  );
};

export const AuthButtons = ({ black }: { black?: boolean }) => {
  const color = black ? 'black' : 'white';
  return (
    <Flex gap={2} hideBelow={'md'}>
      <Link href="/sign-in">
        <Text
          className="group-hover:text-[#8ad5e7] transition duration-150 group-hover:-translate-y-1"
          fontFamily={'var(--font-rubik)'}
          textColor={color}
          fontWeight={'bold'}
        >
          Login
        </Text>
      </Link>
    </Flex>
  );
};
