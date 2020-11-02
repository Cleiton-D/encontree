import React, { useMemo, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { StackParamList } from '../../routes/app.routes';

import Header from '../../components/Header';
import Button from '../../components/Button';

import ScheduleCreatedHeader from './Header';

import {
  Container,
  Content,
  ScheduleCreatedText,
  ScheduleDateText,
} from './styles';

type ScheduleCreatedProp = RouteProp<StackParamList, 'ScheduleCreated'>;

const ScheduleCreated = (): JSX.Element => {
  const { reset } = useNavigation();
  const { params } = useRoute<ScheduleCreatedProp>();

  const formattedDate = useMemo(
    () =>
      format(
        parseISO(params.date),
        "EEEE', 'dd 'de' MMMM 'de' yyyy 'às' HH:mm",
        { locale: ptBr },
      ),
    [params],
  );

  const handleFinish = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Header>
        <ScheduleCreatedHeader providerId={params.providerId} />
      </Header>
      <Content>
        <Icon name="check" size={80} color="#04D361" />
        <ScheduleCreatedText>Agendamento concluido</ScheduleCreatedText>
        <ScheduleDateText>{formattedDate}</ScheduleDateText>
        <Button onPress={handleFinish}>Concluir</Button>
      </Content>
    </Container>
  );
};

export default ScheduleCreated;
