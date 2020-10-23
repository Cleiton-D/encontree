import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();

  const handleNavigateSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Logo source={logo} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <LoginImage source={banner} />
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
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountContainer>
        <CreateAccountText>Ainda não tem uma conta?</CreateAccountText>
        <CreateAccountButton onPress={handleNavigateSignUp}>
          <CreateAccountButtonText>Registre-se</CreateAccountButtonText>
        </CreateAccountButton>
      </CreateAccountContainer>
    </SafeAreaView>
  );
};

export default SignIn;
