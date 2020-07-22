import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useForm } from 'react-hook-form';
import { AUTH_USER_TOKEN_KEY, AUTH_USERNAME_KEY } from '../util';

import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Checkbox,
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
import PasswordInput from './PasswordInput';

const SignIn = () => {
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [signInError, setSignInError] = React.useState(false);
  const usernameRef = React.useRef();
  const history = useHistory();
  const { handleSubmit, errors, formState, register, reset } = useForm();

  const handleSignIn = ({ username, password }) => {
    setSignInError(false);
    setLoading(true);

    Auth.signIn(username, password)
      .then((user) => {
        // User needs to change password
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          localStorage.setItem(AUTH_USERNAME_KEY, username);
          history.push('/update-password');
        } else {
          //User is confirmed
          const { jwtToken } = user.signInUserSession.accessToken;
          localStorage.setItem(AUTH_USER_TOKEN_KEY, jwtToken);

          const to = history.state ? history.state.from.pathanme : '/';
          history.push(to);
        }
      })
      .catch((err) => {
        // User needs to confirm account
        if (err.code === 'UserNotConfirmedException') {
          localStorage.setItem(AUTH_USERNAME_KEY, username);
          history.push('/confirm-signup');
        } else {
          setLoading(false);
          setSignInError(true);
          reset();
          usernameRef.current.focus();
        }
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        <Heading textAlign="center">Sign in to your account</Heading>
        <Text textAlign="center">
          or{' '}
          <Link as={RouteLink} to="/signup">
            Sign up
          </Link>
        </Text>
        {signInError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Incorrect username or password.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.username}>
              <Input
                name="username"
                placeholder="Username"
                ref={(el) => {
                  register(el, { required: true });
                  usernameRef.current = el;
                }}
                isDisabled={loading}
              />
              <FormErrorMessage>
                {errors.username && 'Username is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <PasswordInput
                name="password"
                placeholder="Password"
                forwardRef={register({ required: true })}
                isDisabled={loading}
              />
              <FormErrorMessage>
                {errors.password && 'Password is required'}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="space-between">
              <Checkbox name="remember" ref={register} isDisabled={loading}>
                Remember Me
              </Checkbox>
              <Link as={RouteLink} to="/forgot-password">
                Forgot your password?
              </Link>
            </Flex>
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
                Sign In
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default SignIn;
