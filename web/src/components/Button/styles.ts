import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    background: #4b73ff;
    height: 4.5rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 0;
    padding: 0 16px;
    color: #fff;
    font-weight: ${theme.font.medium};
    font-size: 2rem;
  `}
`;
