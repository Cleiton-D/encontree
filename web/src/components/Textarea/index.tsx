import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { Container, Input as StyledInput } from './styles';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
};

const Textarea = ({ label, name, ...rest }: TextareaProps): JSX.Element => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

export default Textarea;
