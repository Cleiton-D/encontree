import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FiAtSign } from 'react-icons/fi';

import Input from '../../../components/Input';
import Modal from '../../../components/Modal';

import { useAuth } from '../../../hooks/auth';
import useClickOutside from '../../../hooks/clickOutside';

import { Container, ModalTitle, Form, Separator, SaveButton } from './styles';

export type EditInfoModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

const EditInfoModal = (
  _: any,
  ref: React.Ref<EditInfoModalRef>,
): JSX.Element | null => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const openModal = useCallback(() => {
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  useImperativeHandle(ref, () => ({ openModal, closeModal }));
  useClickOutside(containerRef, closeModal);

  if (show)
    return (
      <Modal>
        <Container ref={containerRef}>
          <ModalTitle>Editar informações</ModalTitle>
          <Form onSubmit={data => console.log(data)} initialData={user}>
            <Input name="name" label="Nome" placeholder="Digite seu nome" />
            <Input
              icon={FiAtSign}
              name="username"
              label="Nome de usuário"
              placeholder="Digite um nome de usuário"
            />
            <Input
              type="email"
              name="email"
              label="email"
              placeholder="Digite seu email"
            />

            <Separator />

            <Input
              type="password"
              name="currentPassword"
              label="Senha atual"
              placeholder="Digite sua senha atual"
            />
            <Input
              type="password"
              name="newPassword"
              label="Nova senha"
              placeholder="Digite sua nova senha"
            />
            <Input
              type="password"
              name="passwordConfirmation"
              label="Confirmar senha"
              placeholder="Confirme sua nova senha"
            />
            <SaveButton>Salvar</SaveButton>
          </Form>
        </Container>
      </Modal>
    );

  return null;
};

export default forwardRef(EditInfoModal);
