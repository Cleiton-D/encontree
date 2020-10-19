import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { Container, Filter } from './styles';

type ModalProps = {
  children: React.ReactNode;
};

const ModalWrapper = ({ children }: ModalProps): JSX.Element => {
  return (
    <>
      <Container open>{children}</Container>
      <Filter />
    </>
  );
};

const Modal = ({ children }: ModalProps): JSX.Element | null => {
  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  if (modalRoot) {
    return ReactDOM.createPortal(
      <ModalWrapper>{children}</ModalWrapper>,
      modalRoot,
    );
  }

  return null;
};

export default Modal;
