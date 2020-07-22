import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/core';

const PasswordInput = ({ forwardRef, ...rest }) => {
  const [show, setShow] = React.useState(false);
  return (
    <InputGroup name="password">
      <Input {...rest} ref={forwardRef} type={show ? 'text' : 'password'} />
      <InputRightElement>
        <IconButton
          variant="link"
          icon={show ? 'view-off' : 'view'}
          arial-label={`${show ? 'Hide' : 'Show'} password`}
          onClick={() => setShow(!show)}
        />
      </InputRightElement>
    </InputGroup>
  );
};

PasswordInput.propTypes = {
  forwardRef: PropTypes.func,
};

export default PasswordInput;
