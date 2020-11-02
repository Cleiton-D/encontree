import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';

import DashboardHeader from './Header';

import Default from './Default';

const Dashboard = (): JSX.Element => {
  const navigation = useNavigation();

  const handleSearch = useCallback(
    (value: string) => {
      navigation.navigate('Search', { search: value });
    },
    [navigation],
  );

  const handleSelectCategory = useCallback(
    (category: string) => {
      navigation.navigate('Search', { category });
    },
    [navigation],
  );

  return (
    <>
      <Header>
        <DashboardHeader onSearch={handleSearch} />
      </Header>
      <Default onSelectCategory={handleSelectCategory} />
    </>
  );
};

export default Dashboard;
