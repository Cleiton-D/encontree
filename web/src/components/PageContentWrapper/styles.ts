import styled, { css } from 'styled-components';

import { PageContentWrapperProps } from '.';

type ContainerProps = Pick<PageContentWrapperProps, 'full'>;

export const Container = styled.main<ContainerProps>`
  ${({ full }) => css`
    height: 100%;
    padding: 1.5rem;

    ${full
      ? css`
          grid-row: header / main;
        `
      : css`
          grid-area: main;
        `}
  `}
`;

export const Content = styled.div`
  flex-direction: column;
  background-color: #f2f5fc;
  height: 100%;
  border-radius: 2.5rem;
  padding: 1.5rem;
  padding: 3rem 4rem;
`;
