'use client';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accepted', 'true');
    }
    onClose();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('accepted');
      if (accepted !== 'true') {
        onOpen();
      }
    }
  }, [onOpen]);
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        {/* <DrawerCloseButton /> */}
        {/* <DrawerHeader>Create your account</DrawerHeader> */}

        <DrawerBody py={10}>
          <Flex
            width="100%"
            justifyContent={'space-between'}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Text fontSize={20} width={{ base: '100%', md: '60%' }}>
              Ijele SC uses first-party cookies to guarantee the usability of
              the website which is necessary for the personalization of website
              for each user
            </Text>
            <Button onClick={handleClose}>Close</Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
