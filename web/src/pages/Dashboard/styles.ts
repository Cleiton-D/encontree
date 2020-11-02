import styled, { css } from 'styled-components';
import { FiClock } from 'react-icons/fi';

export const Container = styled.div``;

export const PageTitle = styled.h1`
  ${({ theme }) => css`
    color: #333;
    font-weight: ${theme.font.bold};
    font-size: 3.4rem;
    margin-bottom: 5rem;
  `}
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

export const SchedulesContainer = styled.section`
  width: 77rem;
  background: #fff;
  height: 66rem;
  border-radius: 4rem;
  box-shadow: 0px 0px 4px #cddcff;
  padding: 4rem;
`;

export const Schedules = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  height: 100%;
  overflow-y: scroll;
  padding: 0 0.5rem 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const NextScheduleItem = styled.li`
  width: 58rem;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-bottom: 3.2rem;
  background: #4285f7;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.75);
  height: 8rem;
  padding: 1.5rem 3rem;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;

  & + & {
    margin-top: 2.6rem;
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(100% + 2.6rem);
    width: calc(100% + 6rem);
    height: 0.05rem;
    background: #ccc;
    left: -2rem;
  }
`;

export const ScheduleItem = styled.li`
  width: 58rem;
  margin-top: 1rem;
  background: #f4f8ff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  height: 8rem;
  padding: 1.5rem 3rem;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 1rem;
  color: #333;
  cursor: pointer;

  & + & {
    margin-top: 2.6rem;
  }
`;

type ClientAvatarProps = {
  avatarUrl: string;
};

export const ClientAvatar = styled.div<ClientAvatarProps>`
  ${({ avatarUrl }) => css`
    background: url(${avatarUrl}) no-repeat center;
    width: 5rem;
    height: 5rem;
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(175, 175, 175, 0.73);
    margin-right: 2rem;
  `}
`;

export const ClientName = styled.h2`
  ${({ theme }) => css`
    font-size: 2rem;
    font-weight: ${theme.font.medium};
  `}
`;

export const ClockInfo = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 3rem;
`;

export const ClockIcon = styled(FiClock)`
  color: #f7bd43;
  font-size: 1.6rem;
  stroke-width: 3;
  margin-right: 1rem;
`;

export const ScheduleTime = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.font.medium};
    font-size: 1.6rem;
  `}
`;

export const EmptySchedulesText = styled.strong`
  display: block;
  margin: 0 auto;
  text-align: center;

  margin-top: 40px;
  font-size: 22px;
  color: #666;
`;
