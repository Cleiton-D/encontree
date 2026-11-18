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
            .email('Enter a valid email')
            .required('Email is required'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value.lenght,
            then: Yup.string().required('Enter your new password'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: value => !!value.lenght,
              then: Yup.string().required('Confirm your new password'),
            })
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
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
          title: 'Profile updated successfully',
          description: 'Your details were updated successfully',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Profile update failed',
          description:
            'An error occurred while updating your profile, check your details',
        });
      }
    },
    [addToast, updateUser, closeModal],
  );

  if (show)
    return (
      <Modal>
        <Container ref={containerRef}>
          <ModalTitle>Edit details</ModalTitle>
          <Form onSubmit={handleSubmit} initialData={user}>
            <Input name="name" label="Name" placeholder="Enter your name" />
            <Input
              icon={FiAtSign}
              name="username"
              label="Username"
              placeholder="Enter a username"
            />
            <Input
              type="email"
              name="email"
              label="email"
              placeholder="Enter your email"
            />

            <Separator />

            <Input
              type="password"
              name="old_password"
              label="Current password"
              placeholder="Enter your current password"
            />
            <Input
              type="password"
              name="password"
              label="New password"
              placeholder="Enter your new password"
            />
            <Input
              type="password"
              name="password_confirmation"
              label="Confirm password"
              placeholder="Confirm your new password"
            />
            <SaveButton>Save</SaveButton>
          </Form>
        </Container>
      </Modal>
    );

  return null;
};

export default forwardRef(EditInfoModal);
