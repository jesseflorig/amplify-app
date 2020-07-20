import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/core';
import { Link as RouteLink } from 'react-router-dom';

const SignUp = () => {
  const { errors, formState, handleSubmit, register } = useForm();

  console.log(errors);

  const onSubmit = (data) => {
    console.log('submitting', data);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        <Heading textAlign="center">Recover your password</Heading>
        <Text textAlign="center">
          {'or '}
          <Link as={RouteLink} to="/signin">
            Sign in
          </Link>
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.email}>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                ref={register({
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
                })}
              />
              <FormErrorMessage>
                {errors.email &&
                  errors.email.type === 'required' &&
                  'An email is required'}
                {errors.email &&
                  errors.email.type === 'pattern' &&
                  'Email entered does not appear to be valid'}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              width="100%"
              leftIcon="lock"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Recover Password
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default SignUp;
