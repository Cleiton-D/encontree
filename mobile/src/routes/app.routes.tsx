import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../pages/Home';
import Schedules from '../pages/Schedules';
import Profile from '../pages/Profile';

import Search from '../pages/Search';
import EditProfile from '../pages/EditProfile';
import CreateSchedule from '../pages/CreateSchedule';
import ScheduleCreated from '../pages/ScheduleCreated';
import Schedule from '../pages/Schedule';
import Chat from '../pages/Chat';
import Conversations from '../pages/Conversations';
import About from '../pages/About';

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

export type StackParamList = {
  Dashboard: undefined;
  EditProfile: undefined;
  Conversations: undefined;
  About: undefined;
  CreateSchedule: { providerId: string };
  ScheduleCreated: { providerId: string; date: string };
  Schedule: { scheduleId: string };
  Chat: { userId: string };
  Search: { search?: string; category?: string };
};

const Stack = createStackNavigator<StackParamList>();
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
        cardStyle: { backgroundColor: '#fff' },
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={Schedule}
      options={{
        headerBackImage: () => <Icon name="chevron-left" size={24} />,
        headerBackTitleVisible: false,
        headerTitle: 'Agendamento',
        headerTitleStyle: { fontSize: 22 },
      }}
    />
    <Stack.Screen
      name="Conversations"
      component={Conversations}
      options={{
        headerBackImage: () => <Icon name="chevron-left" size={24} />,
        headerBackTitleVisible: false,
        headerTitle: 'Conversas',
        headerTitleStyle: { fontSize: 22 },
      }}
    />
    <Stack.Screen
      name="About"
      component={About}
      options={{
        headerBackImage: () => <Icon name="chevron-left" size={24} />,
        headerBackTitleVisible: false,
        headerTitle: 'Sobre',
        headerTitleStyle: { fontSize: 22 },
      }}
    />
    <Stack.Screen
      name="CreateSchedule"
      component={CreateSchedule}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ScheduleCreated"
      component={ScheduleCreated}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Search"
      component={Search}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AppRoutes;
