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
          name: Yup.string().required('Enter your name'),
          username: Yup.string().required('Enter a username'),
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);

        Alert.alert(
          'Account created successfully',
          'Your account was created successfully, sign in to continue',
        );

        navigation.goBack();
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Sign up failed',
          'An error occurred while creating your account, check your details',
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
                placeholder="Enter your name"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                placeholder="Enter your email"
                returnKeyType="next"
                onSubmitEditing={() => usernameInputRef.current?.focus()}
              />
              <Input
                ref={usernameInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="username"
                placeholder="Enter a username"
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
                Sign up
              </Button>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <SignInContainer>
        <SignInText>Already have an account?</SignInText>
        <SignInButton onPress={handleNavigateSignIn}>
          <SignInButtonText>Sign in</SignInButtonText>
        </SignInButton>
      </SignInContainer>
    </SafeAreaView>
  );
};

export default SignUp;
