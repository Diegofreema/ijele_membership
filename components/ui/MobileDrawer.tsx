import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Text,
  Flex,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { AuthButtons, links } from '../Header';
import { Link } from 'next-view-transitions';
import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { colors } from '@/constant';
import { CustomButton } from '../form/CustomButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogOut: () => void;
  userId: string | undefined;
  buttonText: string;
};

export function MobileDrawer({
  isOpen,
  onClose,
  onLogOut,
  userId,
  buttonText,
}: Props) {
  const color = useColorModeValue('white', '#fff');
  const bg = useColorModeValue(colors.darkBlue, '#181818');
  const { colorMode, toggleColorMode } = useColorMode();
  const pathname = usePathname();
  console.log(userId);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'sm'}>
      <DrawerOverlay />
      <DrawerContent bg={bg} hideFrom={'md'}>
        <DrawerCloseButton color={color} />

        <DrawerBody>
          <Flex
            gap={5}
            flexDir={'column'}
            justifyContent={'center'}
            height={'100%'}
          >
            {links.map(({ href, label }) => {
              const isActive = pathname.includes(href);
              return (
                <Link key={href} href={href} onClick={onClose}>
                  <Text
                    textColor={isActive ? colors.orange : color}
                    fontWeight={'bold'}
                  >
                    {label}
                  </Text>
                </Link>
              );
            })}
            {userId ? (
              <CustomButton
                bg="transparent"
                color="white"
                text="Log out"
                onClick={onLogOut}
                width="fit-content"
                px={0}
                borderRadius={10}
              />
            ) : (
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
            )}
            <Link href="/membership">
              <Button
                bg={colors.brown}
                color={'white'}
                width={'fit-content'}
                px={10}
                borderRadius={10}
              >
                {buttonText}
              </Button>
            </Link>
          </Flex>
        </DrawerBody>
        {/* 
        <DrawerFooter>
          <Button
            borderRadius={50}
            width={50}
            height={50}
            bg={color}
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <Sun color={bg} /> : <Moon color={bg} />}
          </Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
