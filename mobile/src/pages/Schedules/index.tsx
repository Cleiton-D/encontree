import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Text } from './styles';

const Schedules = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <Text>Schedules</Text>
      <Text>{user.username}</Text>
    </Container>
  );
};

export default Schedules;
