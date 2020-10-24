import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Text } from './styles';

const Profile = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
    </Container>
  );
};

export default Profile;
