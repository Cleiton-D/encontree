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
            .email('Digite um email válido')
            .required('Informe seu email'),
          old_password: Yup.string(),
          password: Yup.string()
            .when('old_password', {
              is: value => !!value.lenght,
              then: Yup.string().required('Confirme sua nova senha'),
            })
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
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
          'Cadastro atualizado',
          'Seus dados foram atualizados com com sucesso',
        );

        navigation.goBack();
      } catch {
        Alert.alert(
          'Erro ao atualizar cadastro',
          'Ocorreu um erro na atualização do cadastro, tente novamente',
        );
      }
    },
    [updateUser, navigation],
  );

  const handleCaptureImage = useCallback(() => {
    return new Promise<Image>((resolve, reject) => {
      Alert.alert('Selecionar foto de perfil', '', [
        {
          text: 'Abrir câmera',
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
          text: 'Selecionar da galeria',
          onPress: () => {
            ImagePicker.openPicker({
              cropperCircleOverlay: true,
              cropping: true,
            })
              .then(resolve)
              .catch(reject);
          },
        },
        { text: 'Cancelar' },
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
        'Sua foto atualizada.',
        'Sua foto de perfil foi atualizada com sucesso.',
      );
    } catch {
      Alert.alert('Erro ao atualizar sua foto de perfil.');
    }
  }, [user.id, handleCaptureImage, updateUser]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
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
              placeholder="Digite seu nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              autoCapitalize="words"
              name="username"
              placeholder="Crie um nome de usuário"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              placeholder="Digite seu email"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() => currentPasswordInputRef.current?.focus()}
            />

            <Input
              containerStyle={{ marginTop: 20 }}
              secureTextEntry
              textContentType="newPassword"
              name="old_password"
              placeholder="Digite sua senha atual"
              ref={currentPasswordInputRef}
              returnKeyType="next"
              onSubmitEditing={() => newPasswordInputRef.current?.focus()}
            />
            <Input
              secureTextEntry
              textContentType="newPassword"
              name="password"
              placeholder="Digite sua nova senha"
              ref={newPasswordInputRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <Input
              secureTextEntry
              textContentType="newPassword"
              name="password_confirmation"
              placeholder="Confirme sua nova senha"
              ref={confirmPasswordInputRef}
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Salvar
            </Button>
          </FormContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
