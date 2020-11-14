import React from 'react';
import { FiMessageSquare, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  Logo,
  Navigation,
  Notifications,
  UserContent,
  UserInfo,
  Username,
  ProfileLink,
  UserAvatar,
  LogoutButton,
} from './styles';

const Header = (): JSX.Element => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <Content>
        <Logo to="/dashboard" />
        <Navigation>
          <Notifications to="/conversations" title="Conversas">
            <FiMessageSquare size={26} color="#000" />
          </Notifications>
          <UserContent>
            <UserInfo>
              <Username>
                Olá, <strong>Cleiton</strong>
              </Username>
              <ProfileLink to="/profile">Meu perfil</ProfileLink>
            </UserInfo>
            <UserAvatar avatarUrl={user.avatar_url} />
          </UserContent>
          <LogoutButton onClick={logout}>
            <FiPower size={24} color="#666" />
            <span>Sair</span>
          </LogoutButton>
        </Navigation>
      </Content>
    </Container>
  );
};

export default Header;
