import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

import { Container as InputContainer } from '../../components/Input/styles';
import { Container as ButtonContainer } from '../../components/Button/styles';

import signBackgroundImage from '../../assets/login_web.svg';
import theme from '../../styles/theme';

export const Container = styled.main`
  padding: 1.5rem;
  height: 100%;

  > div {
    background-color: #f2f5fc;
    height: 100%;
    border-radius: 2.5rem;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Content = styled.section`
  position: relative;
  top: 3rem;

  > img {
    display: block;
    margin: 0 auto;
  }
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: 55rem;
  padding: 2.5rem 5rem;
  border-radius: 4rem;
  background: #fff;

  display: flex;
  flex-direction: column;

  > h1 {
    margin: 0 auto;
    color: #333;
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  > span {
    display: inline-block;
    margin: 0 auto;
    margin-top: 8rem;
    color: #666;
    font-weight: ${theme.font.medium};
    font-size: 1.6rem;

    > a {
      text-decoration: none;
      color: #4b73ff;
    }
  }
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${InputContainer} {
    margin-bottom: 4rem;
  }

  ${ButtonContainer} {
    width: 50%;
    align-self: flex-end;
  }
`;

export const Background = styled.div`
  background: url(${signBackgroundImage}) no-repeat center;
  height: 42rem;
  align-self: center;
`;
