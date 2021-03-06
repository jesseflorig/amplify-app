import React from 'react';
import { usePageTitle } from '../hooks/browser-hooks';
import { useAuth } from '../hooks/amplify-hooks';
import { useForm } from 'react-hook-form';
import { AUTH_USER_TOKEN_KEY, AUTH_USERNAME_KEY } from '../util';

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
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import PasswordInput from './PasswordInput';

const UpdatePassword = () => {
  const MIN_PASSWORD_LENGTH = 8;
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [updateError, setUpdateError] = React.useState(false);
  const oldPasswordRef = React.useRef();
  const history = useHistory();
  const { errors, formState, handleSubmit, register, reset, watch } = useForm();
  const watchNewPassword = watch('newPassword', '');

  usePageTitle('Update Password');

  const handleUpdatePassword = ({ oldPassword, newPassword }) => {
    setUpdateError(false);
    setLoading(true);

    const username = localStorage.getItem(AUTH_USERNAME_KEY);

    // Sign in and immediately invoke change password with the returnd CognitoUserObject
    Auth.signIn(username, oldPassword)
      .then((user) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          Auth.completeNewPassword(user, newPassword)
            .then((user) => {
              const { jwtToken } = user.signInUserSession.accessToken;
              localStorage.setItem(AUTH_USER_TOKEN_KEY, jwtToken);

              const to = history.state ? history.state.from.pathanme : '/';
              history.push(to);
            })
            .catch((err) => {
              throw new Error(`${err}`);
            });
        }
      })
      .catch((err) => {
        setUpdateError(true);
        reset();
        oldPasswordRef.current.focus();
      });
  };
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        <Heading textAlign="center">Update your password</Heading>
        <Text textAlign="center">Please update your temporary password</Text>
        {updateError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>There was an error signing up.</AlertTitle>
            <AlertDescription>Please try again, later.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleUpdatePassword)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.oldPassword}>
              <PasswordInput
                name="oldPassword"
                placeholder="Temporary password"
                forwardRef={(el) => {
                  register(el, {
                    required: true,
                  });
                  oldPasswordRef.current = el;
                }}
              />
              <FormErrorMessage>
                {errors.oldPassword &&
                  errors.oldPassword.type === 'required' &&
                  'Your old password is required'}
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
            {loading ? (
              <Flex alignItems="center" justifyContent="center">
                <Spinner mr={2} />
                <Text>Updating Password...</Text>
              </Flex>
            ) : (
              <Button
                mt={4}
                width="100%"
                leftIcon="lock"
                isLoading={formState.isSubmitting}
                type="submit"
              >
                Update Password
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default UpdatePassword;
