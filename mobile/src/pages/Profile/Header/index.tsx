import React from 'react';

import { useAuth } from '../../../hooks/auth';

import { Container, Content, UserImage, UserName } from './styles';

const Header = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <UserImage source={{ uri: user.avatar_url || undefined }} />
        <UserName numberOfLines={1} ellipsizeMode="tail">
          {user.name}
        </UserName>
      </Content>
    </Container>
  );
};

export default Header;
