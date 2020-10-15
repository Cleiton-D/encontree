import styled, { css } from 'styled-components';

export const Container = styled.main`
  flex-grow: 1;
  padding: 1.5rem;
  height: 100%;
`;

export const Content = styled.div`
  background-color: #f2f5fc;
  height: 100%;
  border-radius: 2.5rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 3rem 4rem;
`;

export const PageTitle = styled.h1`
  ${({ theme }) => css`
    color: #333;
    font-weight: ${theme.font.bold};
    font-size: 3.4rem;
  `}
`;
