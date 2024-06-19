'use client';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { CustomInput } from '@/components/form/CustomInput';
import { ValidateInput } from '@/components/form/ValidateInput';
import { CustomText } from '@/components/ui/typography';
import { forgotPassword, loginSchema, resetPassword } from '@/utils/validator';
import { Box, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {};

export const ResetPassword = ({}: Props): JSX.Element => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof resetPassword>>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(resetPassword),
  });

  const onSubmit = (data: z.infer<typeof resetPassword>) => {
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
          type="Create new password"
          href=""
          text="Enter your email and we will send you a reset link"
        />

        <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
          <ValidateInput
            label="Password"
            control={control}
            errors={errors}
            name={'password'}
            placeholder="Enter your new password"
          />
          <ValidateInput
            label="Confirm Password"
            control={control}
            errors={errors}
            name={'confirmPassword'}
            placeholder="Confirm your new password"
          />

          <CustomButton
            text="Reset Password"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
