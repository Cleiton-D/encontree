import React from 'react';

import { Container } from './styles';

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps): JSX.Element => {
  return <Container>{children}</Container>;
};

export default Header;
