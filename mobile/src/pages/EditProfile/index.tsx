import React, { useCallback, useRef } from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  UserImageContainer,
  UpdateUserImageButton,
  UserImage,
  FormContainer,
} from './styles';
import api from '../../services/api';

type ProfileFormData = {
  name: string;
  username: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const EditProfile = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const currentPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const handleEditProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          username: Yup.string().required(),
          email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
          old_password: Yup.string(),
          password: Yup.string()
            .when('old_password', {
              is: value => !!value.lenght,
              then: Yup.string().required('Confirm your new password'),
            })
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          username,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          username,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        Alert.alert(
          'Profile updated',
          'Your details were updated successfully',
        );

        navigation.goBack();
      } catch {
        Alert.alert(
          'Profile update failed',
          'An error occurred while updating your profile, please try again',
        );
      }
    },
    [updateUser, navigation],
  );

  const handleCaptureImage = useCallback(() => {
    return new Promise<Image>((resolve, reject) => {
      Alert.alert('Select profile photo', '', [
        {
          text: 'Open camera',
          onPress: () => {
            ImagePicker.openCamera({
              cropperCircleOverlay: true,
              cropping: true,
            })
              .then(resolve)
              .catch(reject);
          },
        },
        {
          text: 'Choose from gallery',
          onPress: () => {
            ImagePicker.openPicker({
              cropperCircleOverlay: true,
              cropping: true,
            })
              .then(resolve)
              .catch(reject);
          },
        },
        { text: 'Cancel' },
      ]);
    });
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    try {
      const image = await handleCaptureImage();

      const data = new FormData();
      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: image.path,
      });

      const response = await api.patch('/users/avatar', data);
      updateUser(response.data);

      Alert.alert(
        'Photo updated.',
        'Your profile photo was updated successfully.',
      );
    } catch {
      Alert.alert('Failed to update your profile photo.');
    }
  }, [user.id, handleCaptureImage, updateUser]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <UserImageContainer>
            <UserImage source={{ uri: user.avatar_url || undefined }} />
            <UpdateUserImageButton
              activeOpacity={0.5}
              onPress={handleUpdateAvatar}
            >
              <Icon name="camera" size={20} color="#fff" />
            </UpdateUserImageButton>
          </UserImageContainer>

          <FormContainer
            onSubmit={handleEditProfile}
            ref={formRef}
            initialData={user}
          >
            <Input
              autoCapitalize="words"
              name="name"
              placeholder="Enter your name"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              autoCapitalize="words"
              name="username"
              placeholder="Create a username"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Enter your email"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() => currentPasswordInputRef.current?.focus()}
            />

            <Input
              containerStyle={{ marginTop: 20 }}
              secureTextEntry
              textContentType="newPassword"
              name="old_password"
              placeholder="Enter your current password"
              ref={currentPasswordInputRef}
              returnKeyType="next"
              onSubmitEditing={() => newPasswordInputRef.current?.focus()}
            />
            <Input
              secureTextEntry
              textContentType="newPassword"
              name="password"
              placeholder="Enter your new password"
              ref={newPasswordInputRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <Input
              secureTextEntry
              textContentType="newPassword"
              name="password_confirmation"
              placeholder="Confirm your new password"
              ref={confirmPasswordInputRef}
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Save
            </Button>
          </FormContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
