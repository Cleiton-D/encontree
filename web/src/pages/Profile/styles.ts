import { Form } from '@unform/web';
import styled, { css } from 'styled-components';

import Button from '../../components/Button';

export const Container = styled.div``;

export const PageTile = styled.h1`
  color: #333;
  font-size: 3.4rem;
  margin-bottom: 5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 18rem;
  width: fit-content;
`;

export const UserContent = styled.section`
  display: flex;
  align-items: center;
`;

type UserAvatarProps = {
  avatarUrl: string;
};
export const UserAvatar = styled.div<UserAvatarProps>`
  ${({ avatarUrl }) => css`
    position: relative;
    background: url(${avatarUrl}) no-repeat center;
    background-size: cover;
    height: 26rem;
    width: 26rem;
    border-radius: 50%;
    border: 5px solid #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);

    > label {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      border: 3px solid #fff;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #849ffd;
      padding: 1rem;
      color: #fff;
      cursor: pointer;

      input {
        display: none;
      }
    }
  `}
`;

export const UserInfo = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-left: 3.5rem;
  background: #fff;
  width: 73rem;
  padding: 3.4rem 2.5rem;
  border-radius: 40px;
  box-shadow: 0px 0px 4px #cddcff;
`;

export const Username = styled.h2`
  ${({ theme }) => css`
    font-size: 2.4rem;
    color: #333;
    font-weight: ${theme.font.medium};
  `}
`;

export const Usernick = styled.span`
  ${({ theme }) => css`
    font-size: 2.2rem;
    color: #666;
    font-weight: ${theme.font.medium};

    &::before {
      content: '@';
      font-family: ${theme.font.family};
      font-size: 2rem;
    }
  `}
`;

export const UserEmail = styled.span`
  ${({ theme }) => css`
    margin-top: 3.2rem;
    color: #333;
    font-size: 2.2rem;
    font-weight: ${theme.font.medium};
  `}
`;

export const EditInfoButton = styled.button`
  ${({ theme }) => css`
    width: fit-content;
    position: absolute;
    background: none;
    border: 0;
    bottom: 0.5rem;
    right: 3.5rem;
    font-size: 1.8rem;
    font-weight: ${theme.font.medium};
    color: #666;
  `}
`;

export const ConfigurationContainer = styled.section`
  align-self: flex-end;
  width: 76rem;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0px 0px 4px #cddcff;
  padding: 3rem 6rem;
  margin-top: 10.4rem;
`;

export const ConfigurationTitle = styled.h2`
  font-size: 3.2rem;
  color: #333;
`;

export const ConfigurationForm = styled(Form)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  > *:not(:first-child) {
    margin-top: 2.5rem;
  }
`;

export const SaveConfigurationButton = styled(Button)`
  width: fit-content;
  padding: 1rem 5rem;
  align-self: flex-end;
`;

export const ScheduleTimesContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0px 0px 4px #cddcff;
  padding: 3rem 6rem;
  margin-top: 10.4rem;
`;

export const ScheduleTimesTitle = styled.h2`
  font-size: 3.2rem;
  color: #333;
`;

export const SchedulesTimeForm = styled(Form)`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

  > button {
    margin-top: 2.5rem;
  }
`;

export const ShedulesTimeSaveButton = styled(Button)`
  width: fit-content;
  padding: 1rem 5rem;
  align-self: flex-end;
`;
