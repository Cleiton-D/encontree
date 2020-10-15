import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

export const Container = styled.header`
  height: 10rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  padding: 0 4.5rem;
`;

export const Logo = styled.div`
  background: url(${logo}) no-repeat center;
  width: 23rem;
  height: 5rem;
  background-size: cover;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

export const Notifications = styled.button`
  background: none;
  border: 0;
  margin-right: 7rem;
`;

export const UserContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;

  border-left: 1px solid #c5ceed;
`;

export const UserInfo = styled.div`
  margin-left: 2rem;
  margin-right: 1.5rem;
  text-align: right;
`;

export const Username = styled.h2`
  ${({ theme }) => css`
    font-weight: ${theme.font.normal};
    font-size: 2rem;
    color: #333;
    line-height: 2.6rem;

    > strong {
      font-weight: ${theme.font.medium};
      color: #4b73ff;
    }
  `}
`;

export const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #999999;
  font-size: 1.6rem;
`;

type UserAvatarProps = {
  avatarUrl: string;
};

export const UserAvatar = styled.div<UserAvatarProps>`
  ${({ avatarUrl }) => css`
    background: url(${avatarUrl}) no-repeat center;
    width: 6rem;
    height: 6rem;
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
  `}
`;
