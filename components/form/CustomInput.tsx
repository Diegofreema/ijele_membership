'use client';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';

type Props = InputProps & {
  label: string;
  id: string;
  data?: string[];
  password?: boolean;
  handleState?: () => void;
};

export const CustomInput = ({
  id,
  label,
  data,
  password,
  handleState,
  ...props
}: Props): JSX.Element => {
  const { onChange, value } = props;
  const onChangeFn = (e: any) => {
    onChange && onChange(e);
  };
  return (
    <Flex flexDir={'column'}>
      <label htmlFor={id} className="text-sm font-bold text-black">
        {label}
      </label>
      {props.type !== 'select' && (
        <InputGroup>
          <Input
            {...props}
            borderColor={'#eee'}
            color="black"
            _hover={{
              borderColor: 'black',
            }}
          />
          {password && (
            <InputRightElement onClick={handleState} cursor={'pointer'}>
              {props.type === 'text' && (
                <IconButton
                  aria-label="icon"
                  bg="transparent"
                  icon={<Eye color="black" />}
                />
              )}
              {props.type === 'password' && (
                <IconButton
                  aria-label="icon"
                  bg="transparent"
                  icon={<EyeOff color="black" />}
                />
              )}
            </InputRightElement>
          )}
        </InputGroup>
      )}

      {props.type === 'select' && (
        <Select
          value={value}
          onChange={(e) => onChangeFn(e.target.value)}
          placeholder={props.placeholder}
          borderColor={'#eee'}
          color="black"
          _hover={{
            borderColor: 'black',
          }}
        >
          {data?.map((v, i) => (
            <option key={i} value={v} className="capitalize text-black">
              {v}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  );
};
