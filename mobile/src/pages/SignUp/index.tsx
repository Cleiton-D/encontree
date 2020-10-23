import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

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
import api from '../../services/api';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleNavigateSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Digite seu nome'),
          username: Yup.string().required('Digite um nome de usuário'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Informe seu email'),
          password: Yup.string().required('Informe sua senha'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Seu cadastro foi realizado com sucesso, faça login para continuar',
        );

        navigation.goBack();
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Erro ao realizar cadastro',
          'Ocorreu um erro na realização do cadastro, cheque seus dados',
        );
      }
    },
    [navigation],
  );

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
            <FormContainer ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
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
                onSubmitEditing={() => usernameInputRef.current?.focus()}
              />
              <Input
                ref={usernameInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="username"
                placeholder="Digite um nome de usuário"
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
