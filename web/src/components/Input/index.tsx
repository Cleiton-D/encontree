import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container, Input as StyledInput } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const Input = ({ label, name, ...rest }: InputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label>
        <span>{label}</span>
        <StyledInput
          ref={inputRef}
          name={name}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default Input;
