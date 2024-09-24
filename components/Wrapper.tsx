'use client';
import { colors } from '@/constant';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  height?: string;
}

export const Wrapper = ({ children, height = '100dvh' }: Props) => {
  const bg = useColorModeValue(colors.brown, colors.lightDark);
  return (
    <Box minHeight={height} width={{ base: '90%', md: '70%' }} mx="auto">
      {children}
    </Box>
  );
};
