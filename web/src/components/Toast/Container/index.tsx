import React from 'react';
import { useTransition } from 'react-spring';

import Toast, { Message } from '..';

import { Wrapper } from './styles';

type ContainerProps = {
  children: Message[];
};

export const Container = ({ children }: ContainerProps): JSX.Element => {
  const withTransitions = useTransition(children, item => item.key, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Wrapper>
      {withTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} styles={props} />
      ))}
    </Wrapper>
  );
};
