import React from 'react';
import { FiBell } from 'react-icons/fi';

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
} from './styles';

const Header = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <Logo />
        <Navigation>
          <Notifications>
            <FiBell size={26} color="#000" />
          </Notifications>
          <UserContent>
            <UserInfo>
              <Username>
                Olá, <strong>Cleiton</strong>
              </Username>
              <ProfileLink to="#">Meu perfil</ProfileLink>
            </UserInfo>
            <UserAvatar avatarUrl={user.avatar_url} />
          </UserContent>
        </Navigation>
      </Content>
    </Container>
  );
};

export default Header;
