'use client';
import { login } from '@/actions/auth.action';
import { AuthHeader } from '@/components/AuthHeader';
import { CustomButton } from '@/components/form/CustomButton';
import { ValidateInput } from '@/components/form/ValidateInput';
import { CustomText } from '@/components/ui/typography';
import { loginSchema } from '@/utils/validator';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'next-view-transitions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { colors } from '../../../../constant';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
type Props = {};

export const LoginForm = ({}: Props): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [captCha, setCapCha] = useState<string | null>(null);

  // const { executeRecaptcha } = useGoogleReCaptcha();
  const prev = searchParams.get('prev');
  const membership = searchParams.get('membership');
  console.log({ prev, membership });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);

    if (!captCha) {
      toast({
        title: 'Error',
        description: 'Failed to verify recaptcha! You must be a robot!',
        status: 'error',
        position: 'top-right',
      });
      return;
    }
    // if (!executeRecaptcha) {
    //   console.log('Execute recaptcha not yet available');
    //   return;
    // }

    // const token = await executeRecaptcha('submit');
    // const response = await axios({
    //   method: 'post',
    //   url: '/api/recaptcha',
    //   data: {
    //     token,
    //   },
    //   headers: {
    //     Accept: 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json',
    //   },
    // });
    // if (response?.data?.success === true) {
    //   console.log(`Success with score: ${response?.data?.score}`);
    //   toast({
    //     title: 'Success',
    //     description: 'ReCaptcha Verified and Form Submitted!',
    //     position: 'top-right',
    //     status: 'success',
    //   });
    // } else {
    //   console.log(`Failure with score: ${response?.data?.score}`);
    //   toast({
    //     title: 'Error',
    //     description: 'Failed to verify recaptcha! You must be a robot!',
    //     status: 'error',
    //     position: 'top-right',
    //   });
    //   return;
    // }
    try {
      const res = await login(data);

      if (
        res?.error === 'JSON object requested, multiple (or no) rows returned'
      ) {
        return toast({
          title: 'User not found',
          description: 'Please use a different username or password',
          status: 'error',
          position: 'top-right',
        });
      }
      if (res?.error === 'Invalid credentials') {
        return toast({
          title: 'Error: Invalid credentials',
          description: 'Please use a different username or password',
          status: 'error',
          position: 'top-right',
        });
      }
      if (res?.error === 'not verified') {
        return toast({
          title: 'Verify your email address',
          description: 'A verification link was sent to your email address',
          status: 'info',
          position: 'top-right',
        });
      }

      toast({
        title: 'Welcome',
        description: 'Login successfully',
        status: 'success',
        position: 'top-right',
      });

      if (prev) {
        router.replace(`${prev}?membership=${membership}`);
      } else {
        router.replace('/profile');
      }
    } catch (error) {}
  };
  return (
    <Flex mt={{ base: 150, md: 100 }}>
      <Flex
        width={{ base: '90%', md: '70%', lg: '50%' }}
        mx="auto"
        justifyContent={'center'}
        flexDir={'column'}
      >
        <AuthHeader
          type="Login"
          href="/sign-up"
          text="Don’t have an account? Create an account"
        />

        <Box display={'flex'} flexDir={'column'} gap={5} mt={5}>
          <ValidateInput
            label="Email"
            control={control}
            errors={errors}
            name={'email'}
            placeholder="Enter your email address"
          />
          <ValidateInput
            label="Password"
            control={control}
            errors={errors}
            name={'password'}
            placeholder="Enter your password"
            type={'password'}
          />

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CLI_KEY!}
            onChange={setCapCha}
            className="mx-auto"
          />

          <CustomButton
            text="Login"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={!captCha || isSubmitting}
            bg={colors.darkBlue}
          />
          <Link href="/forgot-password">
            <CustomText
              text="Forgot password?"
              fontWeight={'bold'}
              textDecoration={'underline'}
              textColor={'black'}
            />
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};
