'use client';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CustomInput } from './CustomInput';
import { z } from 'zod';
import { loginSchema } from '@/utils/validator';
import { Text } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';

type Props = {
  control: Control<any>;
  name: any;
  errors: FieldErrors<any>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  data?: string[];
  password?: boolean;
  handleState?: () => void;
};

export const ValidateInput = ({
  control,
  errors,
  name,
  placeholder,
  type,
  label,
  data,
  password,
  handleState,
}: Props): JSX.Element => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInput
            {...field}
            label={label}
            id={label}
            type={type}
            placeholder={placeholder}
            data={data}
            password={password}
            handleState={handleState}
          />
        )}
      />
      {errors[name]?.message && (
        <Text textColor={'red'} fontWeight={'bold'}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </>
  );
};
