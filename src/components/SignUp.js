import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useForm } from 'react-hook-form';
import { AUTH_USERNAME_KEY } from '../util';

import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useHistory, Link as RouteLink } from 'react-router-dom';

const SignUp = () => {
  const MIN_PASSWORD_LENGTH = 8;
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState(false);
  const emailRef = React.useRef();
  const { errors, formState, handleSubmit, register, reset, watch } = useForm();
  const history = useHistory();
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
      .then(() => {
        setLoading(false);
        localStorage.setItem(AUTH_USERNAME_KEY, username);
        history.push('/confirm-signup');
      })
      .catch((err) => {
        setSignUpError(true);
        setLoading(false);
        reset();
        emailRef.current.focus();
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
        {signUpError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>There was an error signing up.</AlertTitle>
            <AlertDescription>Please try again, later.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleSignUp)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.email}>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                ref={(el) => {
                  register(el, {
                    required: true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
                  });
                  emailRef.current = el;
                }}
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
                  'Your password does not match'}
              </FormErrorMessage>
            </FormControl>
            {loading ? (
              <Flex alignItems="center" justifyContent="center">
                <Spinner mr={2} />
                <Text>Signing In...</Text>
              </Flex>
            ) : (
              <Button
                mt={4}
                width="100%"
                leftIcon="lock"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default SignUp;
