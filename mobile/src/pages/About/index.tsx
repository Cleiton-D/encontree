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
  AppRepository,
  AppRepositoryLink,
  ReleaseDate,
} from './styles';

const About = (): JSX.Element => (
  <ScrollView style={{ backgroundColor: '#fff' }}>
    <Container>
      <EncontreeLogo source={logo} />
      <EncontreeVersion>Version 1.0.1</EncontreeVersion>
      <AppDescription>
        Encontree is an open source project originally built as the final
        undergraduate project (TCC) of the Information Systems program at
        Faculdades Integradas de Cacoal - UNESC.
      </AppDescription>

      <Title>Author:</Title>
      <AuthorContainer>
        <AuthorDetail>
          <AuthorImage source={me} />
          <AuthorName>Cleiton Dione Ahnerth Kiper</AuthorName>
        </AuthorDetail>
        <ContactContainer>
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

      <Title>Advisor</Title>
      <AdvisorContainer>
        <AdvisorDetail>
          <AdvisorName>Ideir Coto</AdvisorName>
        </AdvisorDetail>
      </AdvisorContainer>

      <AppRepository>
        <Icon name="github" size={20} color="#333" />
        <AppRepositoryLink>github.com/Cleiton-D/encontree</AppRepositoryLink>
      </AppRepository>

      <ReleaseDate>November 14, 2020</ReleaseDate>
    </Container>
  </ScrollView>
);

export default About;
