'use client';
import { colors } from '@/constant';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: Props) => {
  const bg = useColorModeValue(colors.brown, colors.lightDark);
  return (
    <Box minHeight={'100vh'} width={{ base: '90%', md: '70%' }} mx="auto">
      {children}
    </Box>
  );
};
