'use client';
import React from 'react';

import { Text, useColorModeValue } from '@chakra-ui/react';
import { DarkContainer } from './ui/DarkContainer';

type Props = {
  title: string;
};

export function PageHeader({ title }: Props) {
  const textColor = useColorModeValue('#fff', '#181818');
  return (
    <DarkContainer height={'100px'}>
      <Text
        position={'absolute'}
        left={'15%'}
        bottom={2}
        fontWeight={'bold'}
        textColor={textColor}
        fontSize={25}
        fontFamily={'var(--font-rubik)'}
      >
        {title}
      </Text>
    </DarkContainer>
  );
}
