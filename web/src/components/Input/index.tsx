import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, InputWrapper } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
};

const Input = ({
  label,
  name,
  icon: Icon,
  ...rest
}: InputProps): JSX.Element => {
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
        <InputWrapper>
          {!!Icon && <Icon size={16} />}
          <input
            ref={inputRef}
            name={name}
            defaultValue={defaultValue}
            {...rest}
          />
        </InputWrapper>
      </label>
    </Container>
  );
};

export default Input;
