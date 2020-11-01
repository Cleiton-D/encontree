import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View``;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
    font-size: 26px;
  `}
`;

export const Content = styled.View`
  margin-top: 40px;
  padding: 0 28px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  position: relative;
  align-items: center;

  padding: 0 5px;
  padding-bottom: 5px;
  margin-bottom: 30px;

  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const MenuItemText = styled.Text`
  margin-left: 16px;
  color: #333;
  font-size: 22px;
`;

export const MenuChevronIcon = styled(Icon)`
  position: absolute;
  right: 0;
  color: #aaa;
`;
