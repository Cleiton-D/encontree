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

import { useAuth } from '../../hooks/auth';

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

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const { login } = useAuth();

  const handleNavigateSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Informe seu email'),
          password: Yup.string().required('Informe sua senha'),
        });

        await schema.validate(data, { abortEarly: false });
        await login({ email: data.email, password: data.password });
      } catch (err) {
        Alert.alert(
          'Error na autenticação',
          'Ocorreu um erro ao fazer login, cheque suas credenciais',
        );
      }
    },
    [login],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={{ flex: 1, width: '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <Logo source={logo} />

          <Container>
            <LoginImage source={banner} />
            <FormContainer ref={formRef} onSubmit={handleSignIn}>
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
        </KeyboardAvoidingView>
        <CreateAccountContainer>
          <CreateAccountText>Ainda não tem uma conta?</CreateAccountText>
          <CreateAccountButton onPress={handleNavigateSignUp}>
            <CreateAccountButtonText>Registre-se</CreateAccountButtonText>
          </CreateAccountButton>
        </CreateAccountContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
