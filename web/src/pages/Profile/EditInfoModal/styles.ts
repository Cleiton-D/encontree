import styled, { css } from 'styled-components';
import { Form as UnformContainer } from '@unform/web';

import Button from '../../../components/Button';

export const Container = styled.div`
  padding: 3rem 6rem;
  border-radius: 4rem;
  background: #fff;
  width: 64rem;
  box-shadow: 0 0 4px #cddcff;
`;

export const ModalTitle = styled.h2`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    font-size: 2.4rem;
  `}
`;

export const Separator = styled.div`
  height: 1px;
  width: 70%;
  background: #999;
  margin: 3.4rem auto 0 auto;
`;

export const Form = styled(UnformContainer)`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;

  > :not(:first-child):not(${Separator}) {
    margin-top: 2.4rem;
  }
`;

export const SaveButton = styled(Button)`
  width: fit-content;
  padding: 1rem 5rem;
  align-self: flex-end;
`;
