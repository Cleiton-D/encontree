import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Text } from './styles';

const Dashboard = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Container>
      <Text>Dashboard</Text>
      <Text>{user.username}</Text>
    </Container>
  );
};

export default Dashboard;
