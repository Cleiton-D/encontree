import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import ProfileHeader from './Header';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  MenuItem,
  MenuItemText,
  MenuChevronIcon,
} from './styles';

const Profile = (): JSX.Element => {
  const { logout } = useAuth();
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    (to: string) => {
      navigate(to);
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    Alert.alert('Sign out of Encontree', 'Do you really want to sign out of Encontree?', [
      { text: 'No' },
      { text: 'Yes', onPress: logout },
    ]);
  }, [logout]);

  return (
    <Container>
      <Header>
        <ProfileHeader />
      </Header>
      <Content>
        <MenuItem
          activeOpacity={0.5}
          onPress={() => handleNavigate('EditProfile')}
        >
          <Icon name="user" size={30} color="#444" />
          <MenuItemText>Edit Profile</MenuItemText>
          <MenuChevronIcon name="chevron-right" size={24} />
        </MenuItem>

        <MenuItem
          activeOpacity={0.5}
          onPress={() => handleNavigate('Conversations')}
        >
          <Icon name="message-circle" size={30} color="#444" />
          <MenuItemText>Conversations</MenuItemText>
          <MenuChevronIcon name="chevron-right" size={24} />
        </MenuItem>

        <MenuItem activeOpacity={0.5} onPress={() => handleNavigate('About')}>
          <Icon name="help-circle" size={30} color="#444" />
          <MenuItemText>About</MenuItemText>
          <MenuChevronIcon name="chevron-right" size={24} />
        </MenuItem>

        <MenuItem activeOpacity={0.5} onPress={handleLogout}>
          <Icon name="power" size={30} color="#444" />
          <MenuItemText>Sign out</MenuItemText>
          <MenuChevronIcon name="chevron-right" size={24} />
        </MenuItem>
      </Content>
    </Container>
  );
};

export default Profile;
