'use client';
import { colors } from '@/constant';
import { Box, ResponsiveValue, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  height?:
    | ResponsiveValue<
        | number
        | (string & {})
        | 'inherit'
        | '-moz-initial'
        | 'initial'
        | 'revert'
        | 'revert-layer'
        | 'unset'
        | '-moz-max-content'
        | '-moz-min-content'
        | '-webkit-fit-content'
        | 'auto'
        | 'fit-content'
        | 'max-content'
        | 'min-content'
      >
    | undefined;
  hiddenBelow?: 'md';
}

export const DarkContainer = ({ children, height, hiddenBelow }: Props) => {
  const bg = useColorModeValue(colors.brown, colors.lightDark);

  return (
    <Box
      hideBelow={hiddenBelow}
      minH={height}
      bg={bg}
      pt={{ base: '50px', md: '100px' }}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      position={'relative'}
    >
      {children}
    </Box>
  );
};
