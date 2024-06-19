'use client';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { CustomInput } from '@/components/form/CustomInput';
import { ValidateInput } from '@/components/form/ValidateInput';
import { CustomText } from '@/components/ui/typography';
import { forgotPassword, loginSchema } from '@/utils/validator';
import { Box, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {};

export const ForgotPassword = ({}: Props): JSX.Element => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPassword>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPassword),
  });

  const onSubmit = (data: z.infer<typeof forgotPassword>) => {
    console.log(data);
  };
  return (
    <Flex mt={{ base: 50, md: 50 }}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '50%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Forgot Password?"
          href=""
          text="Enter your email and we will send you a reset link"
        />

        <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
          <ValidateInput
            label="Email"
            control={control}
            errors={errors}
            name={'email'}
            placeholder="Enter your email address"
          />

          <CustomButton
            text="Submit"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
