import React from 'react';
import { useAuth } from '../hooks/useAmplify';
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
  const MIN_PASSWORD_LENGTH = 8;
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState(false);
  const { errors, formState, handleSubmit, register, watch } = useForm();
  const watchPassword = watch('password', '');

  const handleSignUp = ({ email, username, password }) => {
    setSignUpError(false);
    setLoading(true);

    Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
      .then((data) => {
        console.log('success', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setSignUpError(true);
        setLoading(false);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        <Heading textAlign="center">Sign up for an account</Heading>
        <Text textAlign="center">
          or{' '}
          <Link as={RouteLink} to="/signin">
            Sign in
          </Link>
        </Text>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
            <FormControl isInvalid={errors.username}>
              <Input
                name="username"
                placeholder="Username"
                ref={register({ required: true })}
              />
              <FormErrorMessage>
                {errors.username && 'Username is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                ref={register({
                  required: true,
                  minLength: MIN_PASSWORD_LENGTH,
                })}
              />
              <Text fontSize="xs" color="gray.500" mx={1}>
                {`Minimum of ${MIN_PASSWORD_LENGTH} characters.`}
              </Text>
              <FormErrorMessage>
                {errors.password &&
                  errors.password.type === 'required' &&
                  'A password is required'}
                {errors.password &&
                  errors.password.type === 'minLength' &&
                  `Your password must be at least ${MIN_PASSWORD_LENGTH} characters`}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                ref={register({
                  required: true,
                  validate: (value) => value === watchPassword,
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'required' &&
                  'You must confirm your password'}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' &&
                  'Your passwords do not match'}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              width="100%"
              leftIcon="lock"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default SignUp;
