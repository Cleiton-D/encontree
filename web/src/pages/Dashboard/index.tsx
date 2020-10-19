import React from 'react';

import DatePicker from '../../components/DatePicker';

import {
  Container,
  Content,
  PageTitle,
  SchedulesContainer,
  Schedules,
  ScheduleItem,
  ClientAvatar,
  ClientName,
  ClockInfo,
  ClockIcon,
  ScheduleTime,
} from './styles';

const Dashboard = (): JSX.Element => {
  return (
    <Container>
      <PageTitle>Horários agendados</PageTitle>
      <Content>
        <SchedulesContainer>
          <Schedules>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
            <ScheduleItem>
              <ClientAvatar avatarUrl="http://127.0.0.1:3333/files/e9c3eca78ea8e635b70b-user.jpg" />
              <ClientName>Cleiton Dione</ClientName>
              <ClockInfo>
                <ClockIcon />
                <ScheduleTime>15:00</ScheduleTime>
              </ClockInfo>
            </ScheduleItem>
          </Schedules>
        </SchedulesContainer>
        <DatePicker />
      </Content>
    </Container>
  );
};

export default Dashboard;
