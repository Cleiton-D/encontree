import styled, { css } from 'styled-components';
import { FiChevronRight } from 'react-icons/fi';

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
  width: 77rem;
  background: #fff;
  height: 66rem;
  border-radius: 4rem;
  box-shadow: 0px 0px 4px #cddcff;
  padding: 4rem;
  margin-left: 25rem;
`;

export const ChatList = styled.ul`
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

export const ChatItem = styled.li`
  display: flex;
  align-items: center;

  width: 58rem;
  background: #f4f8ff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  height: 8rem;
  padding: 1.5rem 3rem;
  position: relative;
  border-radius: 1rem;
  color: #333;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:not(:first-child) {
    margin-top: 2rem;
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
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

export const ArrowLeft = styled(FiChevronRight)`
  position: absolute;
  right: 2rem;
  font-size: 2.4rem;
  color: #333;
`;

export const EmptyConversationsText = styled.strong`
  display: block;
  margin: 0 auto;
  text-align: center;

  margin-top: 40px;
  font-size: 22px;
  color: #666;
`;
