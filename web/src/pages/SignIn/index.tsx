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
            .email('Digite um e-mail válido')
            .required('Informe seu email'),
          password: Yup.string().required('Informe sua senha'),
        });

        await schema.validate(data, { abortEarly: false });
        await login({ email: data.email, password: data.password });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, cheque suas credenciais',
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
          <h1>Faça seu login</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Email"
              name="email"
              placeholder="Digite seu email"
            />
            <Input
              type="password"
              label="Senha"
              name="password"
              placeholder="Digite sua senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>
          <span>
            Ainda não tem uma conta? <Link to="/signup">Registre-se</Link>
          </span>
        </FormWrapper>
      </Content>
    </Container>
  );
};

export default SignIn;
