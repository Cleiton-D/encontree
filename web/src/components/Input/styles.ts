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

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;
    height: 5rem;
    padding: 1.5rem;
    border-radius: 0.3rem;
    border: 0.1rem solid #b6cdf0;
    background: #fff;

    svg {
      color: #999;
      stroke-width: 2.5;
      display: inline-block;
      margin-right: 1rem;
    }

    svg + input {
      padding-left: 0.8rem;
      border-left: 0.1rem solid #b6cdf0;
    }

    > input {
      border: 0;
      width: 100%;
      height: 3rem;
      font-size: 1.6rem;
      font-weight: ${theme.font.medium};
      color: #333;
      background: transparent;

      &::placeholder {
        color: #666;
      }
    }
  `}
`;
