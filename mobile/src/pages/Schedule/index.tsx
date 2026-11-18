import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import { StackParamList } from '../../routes/app.routes';

import {
  Container,
  ScheduleDetailContainer,
  ProviderDetail,
  ProviderImage,
  ProviderInfo,
  ProviderName,
  ProviderNickname,
  ScheduleServiceDetails,
  ScheduleTimeContainer,
  ScheduleTimeItem,
  ScheduleTimeItemTitle,
  ScheduleTimeItemValue,
  ScheduleDescriptionContainer,
  ScheduleDescriptionTitle,
  ScheduleDescriptionValue,
  SendMessageButtonContainer,
} from './styles';
import api from '../../services/api';
import Button from '../../components/Button';

type ScheduleCreatedProp = RouteProp<StackParamList, 'Schedule'>;

type Schedule = {
  id: string;
  date: string;
  provider: {
    category: {
      description: string;
    };
    user: {
      id: string;
      name: string;
      username: string;
      avatar_url: string;
    };
  };
};

const Schedule = (): JSX.Element => {
  const [schedule, setSchedule] = useState<Schedule>();

  const { params } = useRoute<ScheduleCreatedProp>();
  const navigation = useNavigation();

  const [formattedDate, formattedHour] = useMemo(() => {
    if (schedule) {
      const parsedDate = parseISO(schedule.date);
      const date = format(parsedDate, 'MMM dd, yyyy', { locale: enUS });
      const hour = format(parsedDate, 'HH:00', { locale: enUS });

      return [date, hour];
    }
    return ['', ''];
  }, [schedule]);

  const handleNavigate = useCallback(() => {
    if (schedule) {
      navigation.navigate('Chat', { userId: schedule?.provider.user.id });
    }
  }, [schedule, navigation]);

  useEffect(() => {
    async function loadsSchedule(): Promise<void> {
      const response = await api.get(`/schedules/show/${params.scheduleId}`);
      setSchedule(response.data);
    }
    loadsSchedule();
  }, [params]);

  return (
    <Container>
      <ScheduleDetailContainer>
        <ProviderDetail>
          <ProviderImage
            source={{ uri: schedule?.provider.user.avatar_url || undefined }}
          />
          <ProviderInfo>
            <ProviderName>{schedule?.provider.user.name}</ProviderName>
            <ProviderNickname>
              @{schedule?.provider.user.username}
            </ProviderNickname>
          </ProviderInfo>
        </ProviderDetail>
        <ScheduleServiceDetails>
          <ScheduleTimeContainer>
            <ScheduleTimeItem>
              <ScheduleTimeItemTitle>Date</ScheduleTimeItemTitle>
              <ScheduleTimeItemValue>{formattedDate}</ScheduleTimeItemValue>
            </ScheduleTimeItem>

            <ScheduleTimeItem>
              <ScheduleTimeItemTitle>Time</ScheduleTimeItemTitle>
              <ScheduleTimeItemValue>{formattedHour}</ScheduleTimeItemValue>
            </ScheduleTimeItem>
          </ScheduleTimeContainer>
          <ScheduleDescriptionContainer>
            <ScheduleDescriptionTitle>Category</ScheduleDescriptionTitle>
            <ScheduleDescriptionValue numberOfLines={4} ellipsizeMode="tail">
              {schedule?.provider.category.description}
            </ScheduleDescriptionValue>
          </ScheduleDescriptionContainer>
        </ScheduleServiceDetails>
      </ScheduleDetailContainer>

      <SendMessageButtonContainer>
        <Button icon="send" onPress={handleNavigate}>
          Send message
        </Button>
      </SendMessageButtonContainer>
    </Container>
  );
};

export default Schedule;
