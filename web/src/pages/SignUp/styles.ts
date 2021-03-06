import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

import { Container as InputContainer } from '../../components/Input/styles';
import { Container as ButtonContainer } from '../../components/Button/styles';

import signupBackgroundImage from '../../assets/signup_web.svg';
import logo from '../../assets/logo.png';

import theme from '../../styles/theme';

export const Container = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
`;

export const Content = styled.div`
  position: relative;
  top: 3rem;

  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

export const Logo = styled.div`
  display: block;
  margin: 0 auto;
  background: url(${logo}) no-repeat center;
  width: 29rem;
  height: 6rem;
  background-size: cover;
  margin-bottom: 5rem;
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
    margin-top: 5rem;
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

  ${InputContainer}:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  ${ButtonContainer} {
    margin-top: 3rem;
    width: 50%;
    align-self: flex-end;
  }
`;

export const Background = styled.div`
  background: url(${signupBackgroundImage}) no-repeat center;
  height: 45rem;
  align-self: center;
`;
