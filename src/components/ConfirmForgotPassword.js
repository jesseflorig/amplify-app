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
  const MIN_PASSWORD_LENGTH = 8;
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [confirmReset, setConfirmReset] = React.useState(false);
  const codeRef = React.useRef();
  const history = useHistory();
  const { errors, formState, handleSubmit, register, watch } = useForm();
  const watchNewPassword = watch('newPassword', '');

  const handleConfirmForgotPassword = ({ code, newPassword }) => {
    setLoading(true);
    const username = localStorage.getItem(AUTH_USERNAME_KEY);

    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        setLoading(false);
        setConfirmReset(true);

        setTimeout(() => {
          history.push('/signin');
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        {!confirmReset ? (
          <Stack spacing={2}>
            <Heading textAlign="center">Reset your password</Heading>
            <Text textAlign="center">
              {'or '}
              <Link as={RouteLink} to="/signin">
                Sign in
              </Link>
            </Text>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Heading textAlign="center">Password reset</Heading>
            <Text textAlign="center">
              {'Redirecting to '}
              <Link as={RouteLink} to="/signin">
                Sign in...
              </Link>
            </Text>
          </Stack>
        )}
        {!confirmReset && (
          <form onSubmit={handleSubmit(handleConfirmForgotPassword)}>
            <Stack spacing={2}>
              <FormControl isInvalid={errors.code}>
                <Input
                  name="code"
                  type="password"
                  placeholder="Reset code"
                  ref={(el) => {
                    register(el, { required: true });
                    codeRef.current = el;
                  }}
                  isDisabled={loading}
                />
                <FormErrorMessage>
                  {errors.code && 'Confirmation code is required'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.newPassword}>
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  ref={register({
                    required: true,
                    minLength: MIN_PASSWORD_LENGTH,
                  })}
                />
                <Text fontSize="xs" color="gray.500" mx={1}>
                  {`Minimum of ${MIN_PASSWORD_LENGTH} characters.`}
                </Text>
                <FormErrorMessage>
                  {errors.newPassword &&
                    errors.newPassword.type === 'required' &&
                    'A new password is required'}
                  {errors.newPassword &&
                    errors.newPassword.type === 'minLength' &&
                    `Your new password must be at least ${MIN_PASSWORD_LENGTH} characters`}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  ref={register({
                    required: true,
                    validate: (value) => value === watchNewPassword,
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'required' &&
                    'You must confirm your new password'}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' &&
                    'Your new password does not match'}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                width="100%"
                leftIcon="lock"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
