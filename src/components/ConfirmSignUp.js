import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useForm } from 'react-hook-form';
import { AUTH_USERNAME_KEY } from '../util';

import {
  Alert,
  AlertIcon,
  AlertDescription,
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

const ConfirmSignup = () => {
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState(false);
  const [confirmSuccess, setConfirmSuccess] = React.useState(false);
  const codeRef = React.useRef();
  const history = useHistory();
  const { handleSubmit, errors, formState, register, reset } = useForm();

  const handleConfirmSignUp = ({ code }) => {
    setConfirmError(false);
    setLoading(true);

    const username = localStorage.getItem(AUTH_USERNAME_KEY);

    Auth.confirmSignUp(username, code)
      .then(() => {
        setConfirmSuccess(true);
        localStorage.removeItem(AUTH_USERNAME_KEY);

        setTimeout(() => {
          history.push('/signin');
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        setConfirmError(true);
        reset();
        codeRef.current.focus();
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Stack spacing={2} width="30em">
        {confirmSuccess ? (
          <>
            <Heading textAlign="center">Account confirmed</Heading>
            <Text textAlign="center">
              {'Redirecting to '}
              <Link as={RouteLink} to="/signin">
                Sign In...
              </Link>
            </Text>
          </>
        ) : (
          <>
            <Heading textAlign="center">Confirm your account</Heading>
            <Text textAlign="center">
              You should receive a confirmation code in your email
            </Text>
          </>
        )}
        {confirmError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              There was an error confirming your account.
            </AlertDescription>
          </Alert>
        )}
        {!confirmSuccess && (
          <form onSubmit={handleSubmit(handleConfirmSignUp)}>
            <Stack spacing={2}>
              <FormControl isInvalid={errors.code}>
                <Input
                  name="code"
                  type="password"
                  placeholder="Confirmation code"
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
              {loading ? (
                <Flex alignItems="center" justifyContent="center">
                  <Spinner mr={2} />
                  <Text>Confirming email...</Text>
                </Flex>
              ) : (
                <Button
                  mt={4}
                  width="100%"
                  leftIcon="lock"
                  isLoading={formState.isSubmitting}
                  type="submit"
                >
                  Confirm Account
                </Button>
              )}
            </Stack>
          </form>
        )}
      </Stack>
    </Flex>
  );
};

export default ConfirmSignup;
