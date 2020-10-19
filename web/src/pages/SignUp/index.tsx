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
            .email('Digite um e-mail válido')
            .required('Informe seu email'),
          password: Yup.string().required('Informe sua senha'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);
        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description:
            'Seu cadastro foi realizado com sucesso, faça login para continuar',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao realizar cadastro',
          description:
            'Ocorreu um erro na realização do cadastro, cheque seus dados',
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
          <h1>Faça seu cadastro</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Nome"
              name="name"
              placeholder="Digite seu nome"
            />
            <Input
              type="text"
              label="Email"
              name="email"
              placeholder="Digite seu email"
            />
            <Input
              type="text"
              label="Nome de usuário"
              name="username"
              placeholder="Digite um nome de usuário"
            />
            <Input
              type="password"
              label="Senha"
              name="password"
              placeholder="Crie uma senha"
            />
            <Button type="submit">Criar conta</Button>
          </Form>
          <span>
            Já tem uma conta? <Link to="/">Entrar</Link>
          </span>
        </FormWrapper>
      </Content>
    </Container>
  );
};

export default SignUp;
