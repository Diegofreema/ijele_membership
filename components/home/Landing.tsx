'use client';

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import { colors } from '@/constant';

export const Landing = () => {
  return (
    <Box className="w-screen h-screen overflow-hidden relative">
      <Box
        width={'100%'}
        height={'100%'}
        position={'relative'}
        display={'flex'}
        backgroundImage={'url(/hero.png)'}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'center'}
        backgroundSize={'cover'}
        alignItems={'center'}
      >
        <CaptionText />
      </Box>
    </Box>
  );
};

const CaptionText = () => {
  return (
    <Flex
      as={motion.div}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      viewport={{ once: true }}
      flexDir={'column'}
      gap={3}
      zIndex={20}
      width={{ base: '90%', md: '80%' }}
      mx="auto"
      mb={50}
    >
      <Heading
        fontSize={{ base: '3xl', md: '7xl' }}
        fontFamily={'var(--font-rubik)'}
        fontWeight={'bold'}
        textColor="white"
      >
        Ijele Membership
      </Heading>
      <Text
        textColor={'#eee'}
        width={{ base: '90%', md: '60%' }}
        fontSize={{ base: 12, md: 15 }}
      >
        As a member, you are an important part of the large IjeleSC family and
        thus a mainstay of the entire club. What would IjeleSC be without its
        members?
      </Text>

      <Link href="/membership">
        <Button
          bg={colors.brown}
          color={'black'}
          width={'fit-content'}
          px={10}
          borderRadius={10}
        >
          Join as a Member
        </Button>
      </Link>
    </Flex>
  );
};
