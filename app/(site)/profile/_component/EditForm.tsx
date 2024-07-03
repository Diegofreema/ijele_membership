'use client';
import { update } from '@/actions/auth.action';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { ValidateInput } from '@/components/form/ValidateInput';
import { CustomText } from '@/components/ui/typography';
import { MemberType } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { updateSchema } from '@/utils/validator';
import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  useToast,
  Image,
  Progress,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {
  user: MemberType | null;
};

export const EditForm = ({ user }: Props): JSX.Element => {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const toast = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<z.infer<typeof updateSchema>>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      dateOfBirth: '',
      phoneNumber: '',
      salutation: '',
      title: '',
      img_url: '',
    },
    resolver: zodResolver(updateSchema),
  });
  const { img_url, dateOfBirth } = watch();
  useEffect(() => {
    if (user) {
      setValue('email', user?.email);
      setValue('middleName', user?.middle_name || '');
      setValue('firstName', user?.first_name);
      setValue('lastName', user?.last_name);
      setValue('img_url', user?.img_url || '');
      setValue('salutation', user?.salutation || '');
      setValue('title', user?.title || '');
      setValue('dateOfBirth', user?.dateOfBirth || '');
      setValue('phoneNumber', user?.phoneNumber || '');
    }
  }, [user, setValue]);
  const onOpenPicker = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const onSubmit = async (data: z.infer<typeof updateSchema>) => {
    try {
      const res = await update(
        {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName || '',
          salutation: data.salutation,
          img_url: data.img_url || '',
          title: data.title || '',
          dateOfBirth: data.dateOfBirth || '',
          phoneNumber: data.phoneNumber,
        },
        user?.user_id!
      );

      if (res?.error === 'Failed to update') {
        console.log(res?.error);
        toast({
          title: 'Error',
          description: 'Failed to update profile',
          status: 'error',
          isClosable: true,
          duration: 9000,
          position: 'top-right',
        });
        return;
      }
      toast({
        title: 'Success',
        description: 'Account has been updated successfully',
        status: 'success',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'top-right',
      });
    }
  };

  const onHandleImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const filePath = `/profile/${file?.name}`;
      const { data, error } = await supabase.storage
        .from('files')
        .upload(filePath, file);
      if (error) {
        console.log(error);
        setUploading(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      setValue(
        'img_url',
        `https://eqywbgkagvejgblbjpwm.supabase.co/storage/v1/object/public/files/${data?.path}`
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <Flex mt={{ base: 50, md: 100 }} pb={50}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '70%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader type="Edit profile" href="" text="" />
        <Flex width="100%" mt={5} justifyContent={'center'}>
          {!img_url ? (
            <Box
              width={200}
              height={200}
              borderWidth={1}
              borderStyle={'dashed'}
              borderRadius={10}
              bg={'#eee'}
              cursor={'pointer'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              px={5}
              onClick={onOpenPicker}
              onMouseEnter={onOpenPicker}
            >
              <CustomText
                textColor={'black'}
                text="Click to select profile image"
                fontWeight={'bold'}
                textAlign={'center'}
              />
              <Input
                onChange={onHandleImage}
                display={'none'}
                ref={inputRef}
                type="file"
              />
            </Box>
          ) : (
            <Flex
              width={200}
              height={200}
              borderWidth={1}
              borderStyle={'dashed'}
              borderRadius={10}
              position={'relative'}
            >
              <Image
                src={img_url}
                width={'100%'}
                height={'100%'}
                alt="profile-image"
                objectFit={'cover'}
              />
              <IconButton
                as={X}
                aria-label="icon"
                bg={'red'}
                color="white"
                onClick={() => setValue('img_url', '')}
                position="absolute"
                right={0}
                top={0}
                cursor="pointer"
              />
            </Flex>
          )}
        </Flex>
        <Flex
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          my={5}
          flexDirection={'column'}
        >
          {errors.img_url?.message && (
            <Text textColor={'red'} fontWeight={'bold'} textAlign={'center'}>
              {errors.img_url?.message?.toString()}
            </Text>
          )}
          {uploading && <Progress width={300} isIndeterminate hasStripe />}
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Email"
              control={control}
              errors={errors}
              name={'email'}
              placeholder="Enter your email address"
            />
            <ValidateInput
              label="First name"
              control={control}
              errors={errors}
              name={'firstName'}
              placeholder="Enter your first name"
            />
            <ValidateInput
              label="Last name"
              control={control}
              errors={errors}
              name={'lastName'}
              placeholder="Enter your last name"
            />
            <ValidateInput
              label="Middle name "
              control={control}
              errors={errors}
              name={'middleName'}
              placeholder="Enter your middle name"
            />
            {/* <ValidateInput
              label="Password"
              control={control}
              errors={errors}
              name={'password'}
              placeholder="Enter a password"
            />
            <ValidateInput
              label="Confirm password"
              control={control}
              errors={errors}
              name={'confirmPassword'}
              placeholder="Confirm your password"
            /> */}
          </Box>
          <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
            <ValidateInput
              label="Phone number"
              control={control}
              errors={errors}
              name={'phoneNumber'}
              placeholder="Enter your phone number"
            />
            <ValidateInput
              label="Title"
              control={control}
              errors={errors}
              name={'title'}
              placeholder="Enter your title"
            />
            <ValidateInput
              label="Salutation"
              control={control}
              errors={errors}
              type="select"
              data={['Mr', 'Mrs', 'Miss']}
              name={'salutation'}
              placeholder="Select a salutation"
            />
            {/* <ValidateInput
              label="Gender"
              control={control}
              errors={errors}
              type="select"
              data={['Male', 'Female']}
              name={'gender'}
              placeholder="Select a Gender"
            /> */}
            <ValidateInput
              label="Date of birth"
              control={control}
              errors={errors}
              type={'date'}
              name={'dateOfBirth'}
              placeholder="Select a date"
            />
          </Box>
        </SimpleGrid>
        <Flex width={'100%'} justifyContent={'center'}>
          <CustomButton
            text="Update"
            loadingText="Updating..."
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            mt={5}
            width={'250px'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
