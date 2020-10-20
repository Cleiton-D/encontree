import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FiAtSign } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import Modal from '../../../components/Modal';

import { useAuth } from '../../../hooks/auth';
import useClickOutside from '../../../hooks/clickOutside';
import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, ModalTitle, Form, Separator, SaveButton } from './styles';

export type EditInfoModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

type ProfileFormData = {
  name: string;
  username: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const EditInfoModal = (
  _: any,
  ref: React.Ref<EditInfoModalRef>,
): JSX.Element | null => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

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

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          username: Yup.string().required(),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Informe seu email'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value.lenght,
            then: Yup.string().required('Digite sua nova senha'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: value => !!value.lenght,
              then: Yup.string().required('Confirme sua nova senha'),
            })
            .oneOf([Yup.ref('password')], 'As senhas não conferem'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          username,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          username,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        closeModal();

        addToast({
          type: 'success',
          title: 'Cadastro atualizado com sucesso',
          description: 'Seus dados foram atualizados com sucesso',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar cadastro',
          description:
            'Ocorreu um erro ao atualizar seu cadastro, cheque seus dados',
        });
      }
    },
    [addToast, updateUser, closeModal],
  );

  if (show)
    return (
      <Modal>
        <Container ref={containerRef}>
          <ModalTitle>Editar informações</ModalTitle>
          <Form onSubmit={handleSubmit} initialData={user}>
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
              name="old_password"
              label="Senha atual"
              placeholder="Digite sua senha atual"
            />
            <Input
              type="password"
              name="password"
              label="Nova senha"
              placeholder="Digite sua nova senha"
            />
            <Input
              type="password"
              name="password_confirmation"
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
