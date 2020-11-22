import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logo from '../../assets/logo.png';
import me from '../../assets/me.jpeg';

import {
  Container,
  EncontreeLogo,
  EncontreeVersion,
  AppDescription,
  Title,
  AuthorContainer,
  AuthorDetail,
  AuthorImage,
  AuthorName,
  ContactContainer,
  ContactItem,
  ContactText,
  AdvisorContainer,
  AdvisorDetail,
  AdvisorName,
  AdvisorContact,
  AppRepository,
  AppRepositoryLink,
  ReleaseDate,
} from './styles';

const About = (): JSX.Element => (
  <ScrollView style={{ backgroundColor: '#fff' }}>
    <Container>
      <EncontreeLogo source={logo} />
      <EncontreeVersion>Versão 1.0.1</EncontreeVersion>
      <AppDescription>
        O Encontree é um projeto open source utilizado inicalmente como parte do
        Trabalho de Conclusão de Curso (TCC) do curso de Sistemas de Informação
        das Faculdades Integradas de Cacoal - UNESC.
      </AppDescription>

      <Title>Autor:</Title>
      <AuthorContainer>
        <AuthorDetail>
          <AuthorImage source={me} />
          <AuthorName>Cleiton Dione Ahnerth Kiper</AuthorName>
        </AuthorDetail>
        <ContactContainer>
          <ContactItem>
            <Icon name="mail" size={20} color="#333" />
            <ContactText>cleitonahnerth@gmail.com</ContactText>
          </ContactItem>
          <ContactItem>
            <Icon name="linkedin" size={20} color="#333" />
            <ContactText>linkedin.com/in/cleitonkiper</ContactText>
          </ContactItem>
          <ContactItem>
            <Icon name="github" size={20} color="#333" />
            <ContactText>github.com/Cleiton-D</ContactText>
          </ContactItem>
        </ContactContainer>
      </AuthorContainer>

      <Title>Orientador</Title>
      <AdvisorContainer>
        <AdvisorDetail>
          <AdvisorName>Ideir Coto</AdvisorName>
        </AdvisorDetail>
        <AdvisorContact>
          <ContactItem>
            <Icon name="mail" size={20} color="#333" />
            <ContactText>prof.ideir@unescnet.br</ContactText>
          </ContactItem>
        </AdvisorContact>
      </AdvisorContainer>

      <AppRepository>
        <Icon name="github" size={20} color="#333" />
        <AppRepositoryLink>github.com/Cleiton-D/encontree</AppRepositoryLink>
      </AppRepository>

      <ReleaseDate>14 de novembro de 2020</ReleaseDate>
    </Container>
  </ScrollView>
);

export default About;
