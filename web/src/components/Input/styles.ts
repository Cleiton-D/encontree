import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    span {
      font-weight: ${theme.font.medium};
      font-size: 1.8rem;
      display: inline-block;
      margin-bottom: 0.5rem;
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    height: 5rem;
    width: 100%;
    padding: 1.5rem;
    border-radius: 0.3rem;
    border: 0.1rem solid #b6cdf0;
    font-size: 1.6rem;
    font-weight: ${theme.font.medium};
    background: #fff;
    color: #333;

    &::placeholder {
      color: #666;
    }
  `}
`;
