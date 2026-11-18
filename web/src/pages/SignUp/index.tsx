import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  FormWrapper,
  Form,
  Background,
  Logo,
} from './styles';

const SignUp = (): JSX.Element => {
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);
        history.push('/');

        addToast({
          type: 'success',
          title: 'Account created successfully',
          description:
            'Your account was created successfully, sign in to continue',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Sign up failed',
          description:
            'An error occurred while creating your account, check your details',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <Logo />
        <FormWrapper>
          <h1>Create your account</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Name"
              name="name"
              placeholder="Enter your name"
            />
            <Input
              type="text"
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <Input
              type="text"
              label="Username"
              name="username"
              placeholder="Enter a username"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Create a password"
            />
            <Button type="submit">Create account</Button>
          </Form>
          <span>
            Already have an account? <Link to="/">Sign in</Link>
          </span>
        </FormWrapper>
      </Content>
    </Container>
  );
};

export default SignUp;
