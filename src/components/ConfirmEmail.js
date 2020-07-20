import React from 'react';
import { useAuth } from '../hooks/useAmplify';
import { useForm } from 'react-hook-form';
import { AUTH_USER_TOKEN_KEY } from '../util';

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
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

const ConfirmEmail = () => {
  const Auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState(false);
  const codeRef = React.useRef();
  const history = useHistory();
  const { handleSubmit, errors, formState, register, reset } = useForm();

  const handleSignIn = ({ username, password }) => {
    setConfirmError(false);
    setLoading(true);

    Auth.signIn(username, password)
      .then((user) => {
        const { jwtToken } = user.signInUserSession.accessToken;
        const to = history.state ? history.state.from.pathanme : '/';

        localStorage.setItem(AUTH_USER_TOKEN_KEY, jwtToken);

        // TODO: Login toast

        history.push(to);
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
        <Heading textAlign="center">Confirm your email</Heading>
        <Text textAlign="center">
          A confirmation code was sent to your email
        </Text>
        {confirmError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              There was an error confirming your email.
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Stack spacing={2}>
            <FormControl isInvalid={errors.code}>
              <Input
                name="code"
                type="password"
                placeholder="Confirmation code"
                ref={register({ required: true })}
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
                Confirm Email
              </Button>
            )}
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default ConfirmEmail;
