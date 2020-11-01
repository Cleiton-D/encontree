import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

export const Container = styled.View`
  padding: 0 15px;
  background: #fff;
  flex: 1;
`;

export const UserImageContainer = styled.View`
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
`;

export const UpdateUserImageButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 8px;
  right: 5px;

  width: 35px;
  height: 35px;
  border-radius: 18px;

  justify-content: center;
  align-items: center;

  background: #4b73ff;
`;

export const UserImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

export const FormContainer = styled(Form)`
  margin-top: 40px;
`;
