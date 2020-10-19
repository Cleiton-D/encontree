import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import ComboOption, { OptionProps } from './ComboOption';

import { Container, Select } from './styles';

type ComboProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
};

const Combo = ({
  label,
  name,
  children,
  placeholder,
  ...rest
}: ComboProps): JSX.Element => {
  const inputRef = useRef<HTMLSelectElement>(null);

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
        <Select
          ref={inputRef}
          name={name}
          defaultValue={defaultValue || 'default'}
          {...rest}
        >
          {!!placeholder && (
            <ComboOption value="default" disabled>
              {placeholder}
            </ComboOption>
          )}
          {children}
        </Select>
      </label>
    </Container>
  );
};

export const Option = ComboOption;
export default Combo;
