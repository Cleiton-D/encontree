import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

type ButtonProps = RectButtonProperties & {
  children: string;
};

const Button = ({ children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
