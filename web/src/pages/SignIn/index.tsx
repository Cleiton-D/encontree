import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Content, FormWrapper, Form, Background } from './styles';

const SignIn = (): JSX.Element => {
  return (
    <Container>
      <Background />
      <Content>
        <img
          src={logo}
          alt="Duas setas de direcionamento seguidas da palavra encontree"
        />
        <FormWrapper>
          <h1>Faça seu login</h1>
          <Form
            onSubmit={data => {
              console.log(data);
            }}
          >
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
