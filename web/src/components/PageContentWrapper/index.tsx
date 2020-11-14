import React from 'react';

import { Container, Content } from './styles';

export type PageContentWrapperProps = {
  children: React.ReactNode;
  full?: boolean;
};

const PageContentWrapper = ({
  full = false,
  children,
}: PageContentWrapperProps): JSX.Element => {
  return (
    <Container full={full}>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageContentWrapper;
