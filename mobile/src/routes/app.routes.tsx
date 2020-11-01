import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Schedules from '../pages/Schedules';
import Profile from '../pages/Profile';

import EditProfile from '../pages/EditProfile';

const tabs: TabsConfigsType = {
  Home: {
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

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const BottomTabRoutes = (): JSX.Element => (
  <Bottom.Navigator
    tabBar={props => (
      <AnimatedTabBar tabs={tabs} {...props} dotColor="#D1DBFF" />
    )}
  >
    <Bottom.Screen name="Home" component={Home} />
    <Bottom.Screen name="Schedules" component={Schedules} />
    <Bottom.Screen name="Profile" component={Profile} />
  </Bottom.Navigator>
);

const EmptyHeader = (): JSX.Element | null => null;

const AppRoutes = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={BottomTabRoutes}
      options={{ header: EmptyHeader }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerBackImage: () => <Icon name="chevron-left" size={24} />,
        headerBackTitleVisible: false,
        headerTitleStyle: { display: 'none' },
      }}
    />
  </Stack.Navigator>
);

export default AppRoutes;
