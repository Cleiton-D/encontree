import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ children, ...rest }: ButtonProps): JSX.Element => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
