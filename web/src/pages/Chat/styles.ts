import styled, { css } from 'styled-components';
import { shade } from 'polished';

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

export const ChatContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 77rem;
  background: #fff;
  height: 66rem;
  border-radius: 4rem;
  box-shadow: 0px 0px 4px #cddcff;
  padding: 2.5rem;
`;

export const MessageList = styled.ul`
  padding: 1.5rem;
  list-style-type: none;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
`;

type MessageProps = {
  itsMe?: boolean;
  time: string;
};
export const Message = styled.li<MessageProps>`
  ${({ itsMe, time }) => css`
    position: relative;
    padding: 1rem 1.5rem;
    padding-right: 5.5rem;
    background: #ecf2ff;
    width: fit-content;
    max-width: 50rem;
    margin-top: 1.7rem;
    color: #333;
    font-size: 1.6rem;
    border-radius: 0 15px 15px 15px;
    filter: drop-shadow(0px 0 3px rgba(0, 0, 0, 0.25));

    ${!!itsMe &&
    css`
      align-self: flex-end;
      background: #4d8fff;
      color: #fff;
      border-radius: 15px 0 15px 15px;
    `}

    &::before {
      ${itsMe
        ? css`
            border-color: #4d8fff;
            right: -14px;
            top: 0;
            border-right-color: transparent;
            border-top-right-radius: 5px;
          `
        : css`
            border-color: #ecf2ff;
            left: -14px;
            top: 0;
            border-left-color: transparent;
            border-top-left-radius: 7px;
          `}

      content: '';
      position: absolute;
      border-style: solid;
      width: 15px;

      height: 15px;
      border-right-width: 7.5px;
      border-top-width: 7.5px;
      border-bottom-width: 7.5px;
      border-left-width: 7.5px;

      border-bottom-color: transparent;
    }

    &::after {
      content: '${time}';
      font-size: 1.1rem;
      color: ${itsMe ? '#ddd' : '#bbb'};
      position: absolute;
      bottom: 0.1rem;
      right: 1.5rem;
    }
  `}
`;

export const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  border: 1px solid #bacfff;
  background: #f9fafd;
  padding: 0.5rem;
  border-radius: 2.5rem;
`;

export const MessageInput = styled.input`
  flex: 1;
  height: 100%;
  border: 0;
  margin-left: 1.5rem;
  background: transparent;
  font-size: 1.6rem;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

export const SendMessageButton = styled.button`
  width: 4rem;
  height: 4rem;
  background: #4b73ff;
  border: 0;
  border-radius: 50%;
  transition: background 0.2s;

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${shade(0.2, '#4b73ff')};
  }
`;

export const UserInfoContent = styled.section`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
`;

type UserAvatarProps = {
  avatarUrl: string;
};
export const UserAvatar = styled.div<UserAvatarProps>`
  ${({ avatarUrl }) => css`
    width: 17rem;
    height: 17rem;
    background: url(${avatarUrl}) no-repeat center;
    background-size: cover;
    border-radius: 50%;
    border: 5px solid #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  `}
`;

export const UserInfo = styled.div`
  margin-top: 1rem;
  background: #fff;
  padding: 2.5rem;
  box-shadow: 0 0 4px #cddcff;
  border-radius: 30px;
  width: 35rem;
`;

export const Username = styled.h2`
  ${({ theme }) => css`
    font-size: 1.8rem;
    font-weight: ${theme.font.medium};
    color: #333;
  `}
`;

export const Usernick = styled.span`
  font-size: 1.6rem;
  color: #999;

  &::before {
    content: '@';
  }
`;

export const ServiceDescription = styled.h3`
  ${({ theme }) => css`
    font-size: 1.8rem;
    font-weight: ${theme.font.medium};
    margin-top: 4rem;
  `}
`;

export const Separator = styled.div`
  width: 90%;
  height: 0.1rem;
  background: #ccc;
  margin-bottom: 1.5rem;
`;

export const ScheduleDate = styled.div`
  ${({ theme }) => css`
    font-size: 1.6rem;
    color: #333;

    strong {
      font-weight: ${theme.font.medium};
      margin-right: 0.5rem;
    }
  `}
`;
