import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MonthPicker, { Event } from 'react-native-month-year-picker';
import { format, getDaysInMonth } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import {
  Container,
  Content,
  PageTitle,
  MonthContainer,
  Month,
  MonthPickerContainer,
  DaysList,
  DayContainer,
  DayNumberText,
  DayDescriptionText,
  ResultContainer,
  ScheduleList,
  ScheduleContainer,
  ProviderImage,
  ProviderInfo,
  ProviderName,
  ScheduleTimeContainer,
  ScheduleTimeText,
} from './styles';
import api from '../../services/api';

export type DayOfMonth = {
  day: number;
  description: string;
};

export type Schedule = {
  id: string;
  provider: {
    user: {
      name: string;
      avatar_url: string;
    };
  };
  date: Date;
};

const Schedules = (): JSX.Element => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [schedules, setSchedules] = useState([]);

  const navigation = useNavigation();

  const handleMonthPicker = useCallback(() => {
    setShowMonthPicker(true);
  }, []);

  const handleSelectMonth = useCallback((event: Event, value) => {
    if (event === 'dateSetAction' && value) {
      setDate(value);
      setSelectedDay(1);
    }
    setShowMonthPicker(false);
  }, []);

  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const handleNavigate = useCallback(
    (scheduleId: string) => {
      navigation.navigate('Schedule', { scheduleId });
    },
    [navigation],
  );

  const formatedDate = useMemo(
    () => format(date, "MMMM', 'yyyy", { locale: ptBr }),
    [date],
  );

  const daysOfMonth = useMemo(() => {
    const lastDayOfMonth = getDaysInMonth(date);

    return Array.from({ length: lastDayOfMonth }, (_, index) => {
      const day = new Date(date.getFullYear(), date.getMonth(), index + 1);
      const formated = format(day, 'eee', { locale: ptBr });

      return { day: index + 1, description: formated };
    });
  }, [date]);

  useEffect(() => {
    async function loadSchedules(): Promise<void> {
      if (date && selectedDay) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const response = await api.get('schedules/me', {
          params: { year, month, day: selectedDay },
        });

        setSchedules(response.data);
      }
    }
    loadSchedules();
  }, [date, selectedDay]);

  return (
    <Container>
      <Content>
        <PageTitle>Agendamentos</PageTitle>
        <MonthContainer onPress={handleMonthPicker}>
          <Month>{formatedDate}</Month>
          <Icon name="calendar" color="#000" size={20} />
        </MonthContainer>

        <DaysList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={daysOfMonth}
          keyExtractor={item => String(item.day)}
          renderItem={({ item }) => (
            <DayContainer
              selected={item.day === selectedDay}
              onPress={() => handleSelectDay(item.day)}
            >
              <DayNumberText selected={item.day === selectedDay}>
                {item.day}
              </DayNumberText>

              {item.day === selectedDay && (
                <DayDescriptionText>{item.description}</DayDescriptionText>
              )}
            </DayContainer>
          )}
        />

        <ResultContainer>
          <ScheduleList
            showsVerticalScrollIndicator={false}
            data={schedules}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ScheduleContainer
                activeOpacity={0.7}
                onPress={() => handleNavigate(item.id)}
              >
                <ProviderImage
                  source={{ uri: item.provider.user.avatar_url || undefined }}
                />
                <ProviderInfo>
                  <ProviderName>{item.provider.user.name}</ProviderName>
                  <ScheduleTimeContainer>
                    <Icon name="clock" color="#666" size={14} />
                    <ScheduleTimeText>13:00 - 14:00</ScheduleTimeText>
                  </ScheduleTimeContainer>
                </ProviderInfo>
              </ScheduleContainer>
            )}
          />
        </ResultContainer>

        {showMonthPicker && (
          <MonthPickerContainer>
            <MonthPicker
              value={date}
              onChange={handleSelectMonth}
              minimumDate={new Date(1991, 0)}
              maximumDate={new Date(2025, 5)}
              locale="pt"
              okButton="Selecionar"
              cancelButton="Cancelar"
            />
          </MonthPickerContainer>
        )}
      </Content>
    </Container>
  );
};

export default Schedules;
