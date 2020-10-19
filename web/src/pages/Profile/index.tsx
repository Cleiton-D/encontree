import React, { useCallback, useRef } from 'react';
import { FiCamera } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import Combo, { Option } from '../../components/Combo';
import Textarea from '../../components/Textarea';
import TimeInputRange from '../../components/TimeInputRange';

import EditInfoModal, { EditInfoModalRef } from './EditInfoModal';

import {
  Container,
  PageTile,
  Content,
  UserContent,
  UserAvatar,
  UserInfo,
  Username,
  Usernick,
  UserEmail,
  EditInfoButton,
  ConfigurationContainer,
  ConfigurationTitle,
  ConfigurationForm,
  SaveConfigurationButton,
  ScheduleTimesContainer,
  ScheduleTimesTitle,
  SchedulesTimeForm,
  ShedulesTimeSaveButton,
} from './styles';

const Profile = (): JSX.Element => {
  const { user } = useAuth();

  const editInfoModalRef = useRef<EditInfoModalRef>(null);

  const handleOpenModal = useCallback(() => {
    editInfoModalRef.current?.openModal();
  }, []);

  return (
    <Container>
      <PageTile>Meu Perfil</PageTile>
      <Content>
        <UserContent>
          <UserAvatar avatarUrl={user.avatar_url}>
            <label>
              <FiCamera size={20} />
              <input type="file" />
            </label>
          </UserAvatar>
          <UserInfo>
            <Username>Cleiton Dione Ahnerth Kiper</Username>
            <Usernick>cleitonkiper</Usernick>
            <UserEmail>cleitonahnerth@gmail.com</UserEmail>
            <EditInfoButton onClick={handleOpenModal}>
              Editar Informações
            </EditInfoButton>
          </UserInfo>
        </UserContent>

        <ConfigurationContainer>
          <ConfigurationTitle>Outras configurações</ConfigurationTitle>
          <ConfigurationForm onSubmit={data => console.log(data)}>
            <Combo
              name="categoria"
              label="Categoria"
              placeholder="Selecione uma categoria"
            >
              <Option value="teste">teste</Option>
              <Option value="teste">teste</Option>
            </Combo>
            <Textarea
              name="descricao"
              label="Descricao"
              placeholder="Crie uma breve descrição para você"
            />
            <SaveConfigurationButton type="submit">
              Salvar
            </SaveConfigurationButton>
          </ConfigurationForm>
        </ConfigurationContainer>

        <ScheduleTimesContainer>
          <ScheduleTimesTitle>Horários de trabalho</ScheduleTimesTitle>
          <SchedulesTimeForm onSubmit={data => console.log(data)}>
            <TimeInputRange name="domingo" label="Domingo" />
            <TimeInputRange name="segunda" label="Segunda-feira" available />
            <TimeInputRange name="terca" label="Terça-feira" available />
            <TimeInputRange name="quarta" label="Quarta-feira" available />
            <TimeInputRange name="quinta" label="Quinta-feira" available />
            <TimeInputRange name="sexta" label="Sexta-feira" available />
            <TimeInputRange name="sabado" label="Sábado" available />
            <ShedulesTimeSaveButton type="submit">
              Salvar
            </ShedulesTimeSaveButton>
          </SchedulesTimeForm>
        </ScheduleTimesContainer>
      </Content>
      <EditInfoModal ref={editInfoModalRef} />
    </Container>
  );
};

export default Profile;
