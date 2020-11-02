import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

import { StackParamList } from '../../routes/app.routes';

import Header from '../../components/Header';
import Button from '../../components/Button';

import CreateScheduleHeader from './Header';

import {
  Container,
  Content,
  ChooseDateContainer,
  ChooseDateTitle,
  ChooseHourContainer,
  ChooseHourTitleContainer,
  ChooseHourTitle,
  ChooseHourTitleDate,
  ChooseHourSelectContainer,
  ChooseHourItem,
  ChooseHourItemText,
  ReserveButtonWrapper,
} from './styles';
import api from '../../services/api';

type CreateScheduleProp = RouteProp<StackParamList, 'CreateSchedule'>;

type HourApiResponse = {
  hour: number;
  available: boolean;
};

const CreateSchedule = (): JSX.Element => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState<number>();
  const [hours, setHours] = useState<HourApiResponse[]>([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [loadingReserve, setLoadingReserve] = useState(false);

  const { params } = useRoute<CreateScheduleProp>();
  const navigation = useNavigation();

  const formatedDate = useMemo(
    () => (selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''),
    [selectedDate],
  );

  const handleShowDatePicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleSelectDate = useCallback(date => {
    setSelectedDate(date);
    setShowDatePicker(false);
    setSelectedHour(undefined);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateSchedule = useCallback(async () => {
    if (selectedDate && selectedHour) {
      setLoadingReserve(true);
      try {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedHour,
        );

        const response = await api.post('schedules', {
          provider_id: params.providerId,
          date,
        });

        const { data } = response;

        navigation.navigate('ScheduleCreated', {
          providerId: data.provider_id,
          date: data.date,
        });
      } catch {
        Alert.alert(
          'Erro ao criar agendamento',
          'Não foi possivel criar o agendamento, tente novamente.',
        );
      }

      setLoadingReserve(false);
    }
  }, [selectedDate, selectedHour, params, navigation]);

  useEffect(() => {
    async function loadHours(): Promise<void> {
      if (selectedDate) {
        setLoadingHours(true);

        const day = selectedDate.getDate();
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();

        const response = await api.get<HourApiResponse[]>(
          `providers/show/${params.providerId}/hours-available`,
          { params: { day, month, year } },
        );

        setHours(response.data);
        setLoadingHours(false);
      }
    }
    loadHours();
  }, [selectedDate, params]);

  const morningHours = useMemo(() => {
    return hours
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [hours]);

  const afternoonHours = useMemo(() => {
    return hours
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [hours]);

  return (
    <Container>
      <Header>
        <CreateScheduleHeader providerId={params.providerId} />
      </Header>
      <Content>
        <ChooseDateContainer>
          <ChooseDateTitle>Escolha a data</ChooseDateTitle>
          <Button onPress={handleShowDatePicker}>Selecionar uma data</Button>

          <DateTimePickerModal
            isVisible={showDatePicker}
            onConfirm={handleSelectDate}
            onCancel={() => setShowDatePicker(false)}
            date={selectedDate}
            locale="pt-BR"
            minimumDate={new Date()}
          />
        </ChooseDateContainer>

        {selectedDate && (
          <ChooseHourContainer>
            <ChooseHourTitleContainer>
              <ChooseHourTitle>Escolha o horário</ChooseHourTitle>
              <ChooseHourTitleDate>{formatedDate}</ChooseHourTitleDate>
            </ChooseHourTitleContainer>

            {loadingHours ? (
              <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
              <>
                <ChooseHourSelectContainer>
                  {morningHours.map(item => (
                    <ChooseHourItem
                      available={item.available}
                      selected={selectedHour === item.hour}
                      onPress={() => handleSelectHour(item.hour)}
                    >
                      <ChooseHourItemText
                        available={item.available}
                        selected={selectedHour === item.hour}
                      >
                        {item.hourFormatted}
                      </ChooseHourItemText>
                    </ChooseHourItem>
                  ))}
                </ChooseHourSelectContainer>
                <ChooseHourSelectContainer>
                  {afternoonHours.map(item => (
                    <ChooseHourItem
                      available={item.available}
                      selected={selectedHour === item.hour}
                      onPress={() => handleSelectHour(item.hour)}
                    >
                      <ChooseHourItemText
                        available={item.available}
                        selected={selectedHour === item.hour}
                      >
                        {item.hourFormatted}
                      </ChooseHourItemText>
                    </ChooseHourItem>
                  ))}
                </ChooseHourSelectContainer>
              </>
            )}
          </ChooseHourContainer>
        )}

        {selectedDate && selectedHour && (
          <ReserveButtonWrapper>
            <Button onPress={handleCreateSchedule}>
              {loadingReserve ? 'Agendando...' : 'Agendar'}
            </Button>
          </ReserveButtonWrapper>
        )}
      </Content>
    </Container>
  );
};

export default CreateSchedule;
