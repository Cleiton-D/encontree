import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput } from './styles';

type InputProps = TextInputProps & {
  name: string;
  containerStyle?: {
    [key: string]: any;
  };
};

type InputValueRef = {
  value: string;
};

type InputRef = {
  focus: () => void;
};

const Input = (
  { name, containerStyle, ...rest }: InputProps,
  ref: React.Ref<InputRef>,
): JSX.Element => {
  const inputRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_: any, value) {
        inputValueRef.current.value = value;
        inputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container style={containerStyle}>
      <TextInput
        ref={inputRef}
        keyboardAppearance="light"
        placeholderTextColor="#666"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
