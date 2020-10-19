import React from 'react';

import { Container, Content } from './styles';

type PageContentWrapperProps = {
  children: React.ReactNode;
};

const PageContentWrapper = ({
  children,
}: PageContentWrapperProps): JSX.Element => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageContentWrapper;
