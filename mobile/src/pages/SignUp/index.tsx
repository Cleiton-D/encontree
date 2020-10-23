import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { FormHandles } from '@unform/core';

import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';
import banner from '../../assets/signup_mobile.png';

import {
  Container,
  Logo,
  LoginImage,
  FormContainer,
  SignInContainer,
  SignInText,
  SignInButton,
  SignInButtonText,
} from './styles';

const SignUp = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleNavigateSignIn = useCallback(() => {
    navigation.navigate('SignIn');
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
                autoCapitalize="words"
                name="nome"
                placeholder="Digite seu nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
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
      <SignInContainer>
        <SignInText>Já tem uma conta?</SignInText>
        <SignInButton onPress={handleNavigateSignIn}>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </SignInContainer>
    </SafeAreaView>
  );
};

export default SignUp;
