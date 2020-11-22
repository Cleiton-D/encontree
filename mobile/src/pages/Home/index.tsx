import React, { useCallback } from 'react';
import { View } from 'react-native';
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

  return (
    <View>
      <Header>
        <DashboardHeader onSearch={handleSearch} />
      </Header>
      <Default />
    </View>
  );
};

export default Dashboard;
