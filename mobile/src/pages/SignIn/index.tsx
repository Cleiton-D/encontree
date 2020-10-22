import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  TextInput,
} from 'react-native';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';
import banner from '../../assets/login_mobile.png';

import {
  Container,
  Logo,
  LoginImage,
  FormContainer,
  CreateAccountContainer,
  CreateAccountText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Logo source={logo} />
        <LoginImage source={banner} />
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <FormContainer
            ref={formRef}
            onSubmit={data => {
              console.log(data);
            }}
          >
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Digite seu email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              placeholder="Digite sua senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </FormContainer>
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </Container>
      <CreateAccountContainer>
        <CreateAccountText>Ainda não tem uma conta?</CreateAccountText>
        <CreateAccountButton>
          <CreateAccountButtonText>Registre-se</CreateAccountButtonText>
        </CreateAccountButton>
      </CreateAccountContainer>
    </SafeAreaView>
  );
};

export default SignIn;
