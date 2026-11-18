import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  FormWrapper,
  Form,
  Background,
  Content,
  Logo,
} from './styles';
import { useToast } from '../../hooks/toast';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = (): JSX.Element => {
  const { addToast } = useToast();
  const { login } = useAuth();

  const handleSubmit = useCallback(
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
      } catch {
        addToast({
          type: 'error',
          title: 'Authentication failed',
          description:
            'An error occurred while signing in, check your credentials',
        });
      }
    },
    [login, addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <Logo />
        <FormWrapper>
          <h1>Sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <Button type="submit">Sign in</Button>
          </Form>
          <span>
            Don&apos;t have an account yet? <Link to="/signup">Sign up</Link>
          </span>
        </FormWrapper>
      </Content>
    </Container>
  );
};

export default SignIn;
