'use client';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { MemberType } from '@/types';
import { CustomHeading, CustomText } from '@/components/ui/typography';
import { format, parseISO } from 'date-fns';

type Props = {
  user: MemberType;
};

export const ProfileCard = ({ user }: Props): JSX.Element => {
  // const dateOfBirth = parseISO(user?.dateOfBirth!);
  // const age = format(dateOfBirth, 'yyyy-MM-dd');
  const url =
    user.type === 'annual'
      ? '/year.png'
      : user.type === 'life'
      ? '/life.png'
      : user.type === 'honorary-board-membership'
      ? '/board.png'
      : '/president.png';

  return (
    <Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Card>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 10 }}>
            <Avatar
              src={user.img_url as string}
              width={200}
              height={200}
              objectFit={'cover'}
            />
            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <CustomText
                as="h6"
                text={
                  user?.salutation +
                  ' ' +
                  user.first_name +
                  ' ' +
                  user.last_name
                }
                textColor="black"
                fontSize={{ base: 15, md: 18 }}
                fontWeight={'bold'}
              />
              <CustomText
                as="h6"
                text={user?.title || ''}
                textColor="black"
                fontSize={{ base: 15, md: 18 }}
                fontWeight={'bold'}
              />
              <CustomText
                text={user?.email}
                textColor="black"
                fontWeight={'bold'}
              />
              {/* <CustomText
                as="h6"
                text={user?.middle_name || ''}
                textColor="black"
                fontSize={{ base: 15, md: 18 }}
              /> */}
              <CustomText
                text={user?.gender}
                textTransform={'capitalize'}
                fontWeight={'bold'}
                textColor="black"
              />

              {/* <CustomText text={age} /> */}
            </Box>
          </SimpleGrid>
        </CardBody>
        <CardFooter>
          <Flex gap={3} justifyContent={'center'} width="100%">
            <CustomHeading
              text={'Member'}
              textColor="black"
              fontWeight={'bold'}
            />
            <CustomHeading
              text={user?.type!}
              textColor="black"
              fontWeight={'bold'}
              textTransform={'capitalize'}
            />
            {user.type !== 'regular' && (
              <Avatar
                src={url}
                width={50}
                height={50}
                objectFit={'contain'}
                display={'none'}
              />
            )}
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};
