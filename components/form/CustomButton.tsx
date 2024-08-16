'use client';
import { Box, Button, ButtonProps } from '@chakra-ui/react';
import { colors } from '../../constant';

interface Props extends ButtonProps {
  text: string;
  bg?: string;
}

export const CustomButton = ({
  bg = colors.darkBlue,
  text,
  color = 'white',
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      bg={bg}
      _hover={{ bg: bg }}
      borderRadius={20}
      color={color}
    >
      {text}
    </Button>
  );
};
