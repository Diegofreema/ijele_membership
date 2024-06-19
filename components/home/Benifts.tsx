'use client';
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  UnorderedList,
} from '@chakra-ui/react';
import { CustomHeading } from '../ui/typography';
import { Wrapper } from '../Wrapper';
import { DarkContainer } from '../ui/DarkContainer';

interface Props {}

const texts = [
  'VIP Access to Events: Enjoy priority seating and special invitations to all club events.',
  'Merchandise Discounts: Receive exclusive discounts on club merchandise and apparel.',
  'Networking Opportunities: Connect with fellow members, athletes, and industry leaders through special events and gatherings.',
  'Early Access to Club News: Be the first to receive updates on club activities, new programs, and initiatives.',
  'Recognition: Get acknowledged in club publications and at events for your support and contributions.',
  'By becoming a member, you are not only supporting the club’s growth but also gaining unparalleled access to a community dedicated to excellence in sports, culture, and entertainment.',
];

export const Benefits = ({}: Props) => {
  return (
    <DarkContainer>
      <Wrapper>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 10 }}>
          <CustomHeading text={'Benefits'} />
          <Right />
        </SimpleGrid>
      </Wrapper>
    </DarkContainer>
  );
};

const Right = () => {
  return (
    <Box>
      <CustomHeading
        text="To achieve our vision and support our growth, we offer a variety of membership packages designed to provide exclusive benefits and privileges,please check them below."
        mb={5}
        fontSize={{ base: 15, md: 20 }}
      />
      <UnorderedList>
        {texts.map((t, i) => (
          <ListItem key={i} fontSize={{ base: 11, md: 13 }} textColor={'white'}>
            {t}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
