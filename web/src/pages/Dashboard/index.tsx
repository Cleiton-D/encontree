import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DayModifiers } from 'react-day-picker';
import { parseISO, format, isToday, isAfter } from 'date-fns';

import { useHistory } from 'react-router-dom';
import DatePicker from '../../components/DatePicker';

import api from '../../services/api';

import {
  Container,
  Content,
  PageTitle,
  SchedulesContainer,
  Schedules,
  NextScheduleItem,
  ScheduleItem,
  ClientAvatar,
  ClientName,
  ClockInfo,
  ClockIcon,
  ScheduleTime,
  EmptySchedulesText,
} from './styles';

type Schedule = {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

const Dashboard = (): JSX.Element => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const history = useHistory();

  const handleSelectDate = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleNavigate = useCallback(
    (userId: string) => {
      history.push(`chat/${userId}`);
    },
    [history],
  );

  useEffect(() => {
    async function loadSchedules(): Promise<void> {
      const response = await api.get<Schedule[]>('schedules/me/asprovider', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      });

      const data = response.data.map(schedule => ({
        ...schedule,
        hourFormatted: format(parseISO(schedule.date), 'HH:mm'),
      }));

      setSchedules(data);
    }
    loadSchedules();
  }, [selectedDate]);

  const nextSchedule = useMemo(
    () =>
      schedules.find(schedule => isAfter(parseISO(schedule.date), new Date())),
    [schedules],
  );

  return (
    <Container>
      <PageTitle>Horários agendados</PageTitle>
      <Content>
        <SchedulesContainer>
          {schedules.length > 0 ? (
            <Schedules>
              {isToday(selectedDate) && nextSchedule && (
                <NextScheduleItem
                  onClick={() => handleNavigate(nextSchedule.user.id)}
                >
                  <ClientAvatar avatarUrl={nextSchedule.user.avatar_url} />
                  <ClientName>{nextSchedule.user.name}</ClientName>
                  <ClockInfo>
                    <ClockIcon />
                    <ScheduleTime>{nextSchedule.hourFormatted}</ScheduleTime>
                  </ClockInfo>
                </NextScheduleItem>
              )}

              {schedules.map(schedule => (
                <ScheduleItem
                  key={schedule.id}
                  onClick={() => handleNavigate(schedule.user.id)}
                >
                  <ClientAvatar avatarUrl={schedule.user.avatar_url} />
                  <ClientName>{schedule.user.name}</ClientName>
                  <ClockInfo>
                    <ClockIcon />
                    <ScheduleTime>{schedule.hourFormatted}</ScheduleTime>
                  </ClockInfo>
                </ScheduleItem>
              ))}
            </Schedules>
          ) : (
            <EmptySchedulesText>
              Nenhum agendamento para esta data :(
            </EmptySchedulesText>
          )}
        </SchedulesContainer>

        <DatePicker selectedDays={selectedDate} onDayClick={handleSelectDate} />
      </Content>
    </Container>
  );
};

export default Dashboard;
