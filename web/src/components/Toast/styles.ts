import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

type ContainerProps = {
  type: 'success' | 'info' | 'warning' | 'error';
};

const containerModifiers = {
  info: () => css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: () => css`
    background: #e6fffa;
    color: #2e656a;
  `,
  warning: () => css`
    background: #fdf5de;
    color: #c59130;
  `,
  error: () => css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  ${({ type }) => css`
    width: 36rem;
    position: relative;
    padding: 1.6rem 3rem 1.6rem 1.6rem;
    border-radius: 1rem;
    box-shadow: 0.2rem 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
    display: flex;

    & + div {
      margin-top: 0.8rem;
    }

    ${containerModifiers[type]}

    div {
      flex: 1;
      margin: 0 1rem;

      strong {
        font-size: 1.6rem;
      }

      p {
        margin-top: 0.4rem;
        font-size: 1.4rem;
        opacity: 0.8;
        line-height: 2rem;
      }
    }

    button {
      position: absolute;
      right: 1.6rem;
      top: 1.9rem;
      opacity: 0.6;
      border: 0;
      background: transparent;
      color: inherit;
    }
  `}
`;
