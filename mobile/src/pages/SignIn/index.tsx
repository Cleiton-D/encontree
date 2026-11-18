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
            .email('Enter a valid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });
        await login({ email: data.email, password: data.password });
      } catch (err) {
        Alert.alert(
          'Authentication failed',
          'An error occurred while signing in, check your credentials',
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
                placeholder="Enter your email"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                placeholder="Enter your password"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Sign in
              </Button>
            </FormContainer>
          </Container>
        </KeyboardAvoidingView>
        <CreateAccountContainer>
          <CreateAccountText>Don&apos;t have an account yet?</CreateAccountText>
          <CreateAccountButton onPress={handleNavigateSignUp}>
            <CreateAccountButtonText>Sign up</CreateAccountButtonText>
          </CreateAccountButton>
        </CreateAccountContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
