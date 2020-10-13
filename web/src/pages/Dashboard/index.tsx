import React, { useEffect } from 'react';
import { useToast } from '../../hooks/toast';

const Dashboard = (): JSX.Element => {
  const { addToast } = useToast();

  useEffect(() => {
    addToast({ title: 'Teste', description: 'Testando' });
    addToast({ title: 'Teste 2', description: 'Testando 2', time: 5000 });

    setTimeout(() => {
      addToast({ title: 'Teste 2', description: 'Testando 2', time: 5000 });
    }, 6000);
  }, [addToast]);

  return <h1>Dashboard</h1>;
};

export default Dashboard;
