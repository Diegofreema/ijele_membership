'use client';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { MemberType } from '@/types';
import { CustomHeading, CustomText } from '@/components/ui/typography';
import { format, parseISO } from 'date-fns';
import { colors } from '@/constant';
import { CustomButton } from '@/components/form/CustomButton';
import { useRouter } from 'next/navigation';

type Props = {
  user: MemberType;
};

export const ProfileCard = ({ user }: Props): JSX.Element => {
  console.log({ user });

  const age = user?.dateOfBirth;
  const router = useRouter();
  const onPress = () => {
    router.push(`/profile/${user?.user_id}`);
  };
  const url =
    user.type === 'annual'
      ? '/y.png'
      : user.type === 'life'
      ? '/l.png'
      : user.type === 'honorary-board-membership'
      ? '/board.png'
      : '/president.png';

  const id =
    user.type === 'regular'
      ? 2000
      : user.type === 'annual'
      ? 3000
      : user.type === 'life'
      ? 4000
      : user.type === 'honorary-board-membership'
      ? 5000
      : 6000;

  return (
    <Flex
      height={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
    >
      <Card bg={'white'}>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 10 }}>
            <Avatar
              src={user.img_url as string}
              width={200}
              height={200}
              objectFit={'cover'}
            />
            <Box display={'flex'} flexDirection={'column'} gap={3}>
              <Flex gap={3}>
                <CustomText
                  text={'Name:'}
                  textColor="black"
                  fontSize={{ base: 15, md: 18 }}
                />
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
              </Flex>

              <Flex gap={3}>
                <CustomText text={'Email:'} textColor="black" />
                <CustomText
                  text={user?.email}
                  textColor="black"
                  fontWeight={'bold'}
                />
              </Flex>
              <Flex gap={3}>
                <CustomText text={'ID:'} textColor="black" />
                <CustomText
                  text={`${id}-${user?.userId}`}
                  textColor="black"
                  fontWeight={'bold'}
                />
              </Flex>
              {/* <CustomText
                as="h6"
                text={user?.middle_name || ''}
                textColor="black"
                fontSize={{ base: 15, md: 18 }}
              /> */}
              <Flex gap={3}>
                <CustomText
                  text={'Gender:'}
                  textTransform={'capitalize'}
                  textColor="black"
                />
                <CustomText
                  text={user?.gender}
                  textTransform={'capitalize'}
                  fontWeight={'bold'}
                  textColor="black"
                />
              </Flex>

              <Flex gap={3}>
                <CustomText text={'Date of birth:'} textColor="black" />
                <CustomText
                  text={age!}
                  textColor="black"
                  textTransform={'capitalize'}
                  fontWeight={'bold'}
                />
              </Flex>
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

      <CustomButton
        text="Edit Profile"
        mt={5}
        bg={colors.darkBlue}
        onClick={onPress}
      />
    </Flex>
  );
};
