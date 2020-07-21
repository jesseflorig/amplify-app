import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useForm } from 'react-hook-form';
import { AUTH_USERNAME_KEY } from '../util';

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
import { useHistory, Link as RouteLink } from 'react-router-dom';

const ForgotPassword = () => {
  const Auth = useAuth();
  const history = useHistory();
  const { errors, formState, handleSubmit, register } = useForm();

  const handleForgotPassword = ({ username }) => {
    Auth.forgotPassword(username)
      .then((data) => {
        localStorage.setItem(AUTH_USERNAME_KEY, username);

        history.push('/confirm-forgot-password');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        <Heading textAlign="center">Request a reset code</Heading>
        <Text textAlign="center">
          {'or '}
          <Link as={RouteLink} to="/signin">
            Sign in
          </Link>
        </Text>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.username}>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.username &&
                  errors.username.type === 'required' &&
                  'An username is required'}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              width="100%"
              leftIcon="lock"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Send Reset Code
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
