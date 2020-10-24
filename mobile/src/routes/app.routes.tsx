import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import Icon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Schedules from '../pages/Schedules';
import Profile from '../pages/Profile';

const tabs: TabsConfigsType = {
  Dashboard: {
    icon: () => <Icon name="home" size={24} color="#577DFF" />,
  },
  Schedules: {
    icon: () => <Icon name="calendar" size={24} color="#577DFF" />,
  },
  Profile: {
    icon: () => {
      return <Icon name="user" size={24} color="#577DFF" />;
    },
  },
};

const App = createBottomTabNavigator();

const AppRoutes = (): JSX.Element => (
  <App.Navigator
    tabBar={props => (
      <AnimatedTabBar tabs={tabs} {...props} dotColor="#D1DBFF" />
    )}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Schedules" component={Schedules} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
