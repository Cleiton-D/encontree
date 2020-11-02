import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

type ButtonProps = RectButtonProperties & {
  children: string;
  icon?: string;
};

const Button = ({ children, icon, ...rest }: ButtonProps): JSX.Element => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
      {icon && <Icon name={icon} size={20} color="#fff" />}
    </Container>
  );
};

export default Button;
