import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Combo, { Option } from '../../components/Combo';
import Textarea from '../../components/Textarea';
import TimeInputRange from '../../components/TimeInputRange';

import api from '../../services/api';

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

type Category = {
  id: string;
  description: string;
};

type ConfigurationFormData = {
  category_id: string;
  description: string;
};

type WorkScheduleDay = {
  min: number;
  max: number;
  available: boolean;
};

type WorkScheduleData = {
  [key: string]: WorkScheduleDay;
};

type WorkScheduleFormData = {
  start: number;
  end: number;
  disabled: boolean;
  day: string;
};

const Profile = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [workSchedules, setWorkSchedules] = useState<WorkScheduleData>();

  const { user, provider, updateUser, updateProvider } = useAuth();
  const { addToast } = useToast();

  const editInfoModalRef = useRef<EditInfoModalRef>(null);

  const handleOpenModal = useCallback(() => {
    editInfoModalRef.current?.openModal();
  }, []);

  const handleUpdateAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        try {
          const data = new FormData();
          data.append('avatar', event.target.files[0]);

          const response = await api.patch('/users/avatar', data);
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Photo updated',
            description: 'Your profile photo was changed successfully',
          });
        } catch {
          addToast({
            type: 'error',
            title: 'Photo update failed',
            description:
              'An error occurred while updating your profile photo, please try again',
          });
        }
      }
    },
    [addToast, updateUser],
  );

  const handleSaveConfiguration = useCallback(
    async (data: ConfigurationFormData) => {
      try {
        const schema = Yup.object().shape({
          category_id: Yup.string().required().notOneOf(['default']),
          description: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.post('/providers', data);
        updateProvider(response.data);

        addToast({
          type: 'success',
          title: 'Settings saved successfully',
          description: 'Your settings were saved successfully',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Failed to save settings',
          description:
            'An error occurred while saving your settings, check your details',
        });
      }
    },
    [addToast, updateProvider],
  );

  const handleSaveWorkScheduleConfiguration = useCallback(
    async (data: WorkScheduleData) => {
      try {
        const formData = Object.keys(data).map<WorkScheduleFormData>(key => {
          const item = data[key];

          return {
            start: item.min,
            end: item.max,
            disabled: !item.available,
            day: key,
          };
        });

        await api.put('/providers/workschedules', formData);
        addToast({
          type: 'success',
          title: 'Settings saved successfully',
          description: 'Your settings were saved successfully',
        });
      } catch (err) {
        console.error(err);

        addToast({
          type: 'error',
          title: 'Failed to save settings',
          description:
            'An error occurred while saving your settings, check your details',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get<Category[]>('/categories');
      setCategories(response.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get<WorkScheduleFormData[]>(
        '/providers/workschedules',
      );

      const data = response.data.reduce<WorkScheduleData>(
        (accumulator, item) => {
          const { day, start, end, disabled } = item;
          accumulator[day] = {
            min: start,
            max: end,
            available: !disabled,
          };

          return accumulator;
        },
        {} as WorkScheduleData,
      );

      setWorkSchedules(data);
    }
    loadData();
  }, []);

  return (
    <Container>
      <PageTile>My Profile</PageTile>
      <Content>
        <UserContent>
          <UserAvatar avatarUrl={user.avatar_url}>
            <label>
              <FiCamera size={20} />
              <input type="file" onChange={handleUpdateAvatar} />
            </label>
          </UserAvatar>
          <UserInfo>
            <Username>{user.name}</Username>
            <Usernick>{user.username}</Usernick>
            <UserEmail>{user.email}</UserEmail>
            <EditInfoButton onClick={handleOpenModal}>
              Edit Details
            </EditInfoButton>
          </UserInfo>
        </UserContent>

        <ConfigurationContainer>
          <ConfigurationTitle>Other settings</ConfigurationTitle>
          <ConfigurationForm
            onSubmit={handleSaveConfiguration}
            initialData={provider}
          >
            <Combo
              name="category_id"
              label="Category"
              placeholder="Select a category"
            >
              {categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.description}
                </Option>
              ))}
            </Combo>
            <Textarea
              name="description"
              label="Description"
              placeholder="Write a short description about yourself"
            />
            <SaveConfigurationButton type="submit">
              Save
            </SaveConfigurationButton>
          </ConfigurationForm>
        </ConfigurationContainer>

        <ScheduleTimesContainer>
          <ScheduleTimesTitle>Working hours</ScheduleTimesTitle>
          <SchedulesTimeForm
            onSubmit={handleSaveWorkScheduleConfiguration}
            initialData={workSchedules}
          >
            <TimeInputRange name="sun" label="Sunday" />
            <TimeInputRange name="mon" label="Monday" />
            <TimeInputRange name="tue" label="Tuesday" />
            <TimeInputRange name="wed" label="Wednesday" />
            <TimeInputRange name="thu" label="Thursday" />
            <TimeInputRange name="fri" label="Friday" />
            <TimeInputRange name="sat" label="Saturday" />
            <ShedulesTimeSaveButton type="submit">
              Save
            </ShedulesTimeSaveButton>
          </SchedulesTimeForm>
        </ScheduleTimesContainer>
      </Content>
      <EditInfoModal ref={editInfoModalRef} />
    </Container>
  );
};

export default Profile;
