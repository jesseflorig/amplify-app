import React from 'react';
import { usePageTitle } from '../hooks/browser-hooks';
import { useAuth } from '../hooks/amplify-hooks';
import { useForm } from 'react-hook-form';
import { AUTH_USERNAME_KEY } from '../util';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useHistory, Link as RouteLink } from 'react-router-dom';
import PasswordInput from './PasswordInput';

const ForgotPassword = () => {
  const MIN_PASSWORD_LENGTH = 8;
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [confirmReset, setConfirmReset] = React.useState(false);
  const codeRef = React.useRef();
  const history = useHistory();
  const { errors, formState, handleSubmit, register, watch } = useForm();
  const watchNewPassword = watch('newPassword', '');

  usePageTitle('Forgot Password');

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
            <Heading textAlign="center">Password reset successful</Heading>
            <Flex alignItems="center" justifyContent="center">
              <Spinner size="sm" mr={2} />
              <Text textAlign="center">
                {'Redirecting to '}
                <Link as={RouteLink} to="/signin">
                  Sign in
                </Link>
                {'...'}
              </Text>
            </Flex>
          </Stack>
        )}
        {!confirmReset && (
          <form onSubmit={handleSubmit(handleConfirmForgotPassword)}>
            <Stack spacing={2}>
              <FormControl isInvalid={errors.code}>
                <PasswordInput
                  name="code"
                  placeholder="Reset code"
                  forwardRef={(el) => {
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
                <PasswordInput
                  name="newPassword"
                  placeholder="New password"
                  forwardRef={register({
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
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  forwardRef={register({
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
