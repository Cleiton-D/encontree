import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Message } from '.';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const MessagesList = styled(FlatList as new () => FlatList<Message>)`
  padding: 5px 15px;
  top: 0;
  margin-bottom: ${20 + getBottomSpace()}px;
`;

type MessageItemProps = {
  itsMe: boolean;
};
export const MessageItem = styled.View<MessageItemProps>`
  ${({ itsMe }) => css`
    margin-bottom: 15px;
    margin-left: 15px;
    padding: 10px;
    position: relative;
    width: 50%;

    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;

    ${itsMe
      ? css`
          background: #4d8fff;
          border-top-left-radius: 15px;
          margin-right: 15px;
          align-self: flex-end;
        `
      : css`
          border-top-right-radius: 15px;
          background: #cfdeff;
        `}

    shadow-color: #000;
    shadow-offset: 0px 0px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 1;
  `}
`;

export const MessageArrow = styled.View<MessageItemProps>`
  ${({ itsMe }) => css`
    width: 15px;
    height: 15px;
    position: absolute;
    border-width: 10px;

    ${itsMe
      ? css`
          right: -15px;
          border-top-color: #4d8fff;
          border-left-color: #4d8fff;
          border-bottom-color: transparent;
          border-right-color: transparent;
          border-top-right-radius: 10px;
        `
      : css`
          left: -15px;
          border-top-color: #cfdeff;
          border-right-color: #cfdeff;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-top-left-radius: 10px;
        `}
  `}
`;

export const MessageText = styled.Text<MessageItemProps>`
  ${({ itsMe }) => css`
    color: ${itsMe ? '#fff' : '#333'};
    font-size: 16px;
  `}
`;

export const MessageTime = styled.Text<MessageItemProps>`
  ${({ itsMe }) => css`
    color: ${itsMe ? '#ddd' : '#999'};
    font-size: 11px;
    position: absolute;
    bottom: 5px;
    right: 20px;
  `}
`;

export const InputContainer = styled.View`
  flex-direction: row;

  bottom: ${10 + getBottomSpace()}px;
  margin: 0 20px;
  padding: 7px;
  padding-left: 15px;
  min-height: 55px;
  border-radius: 25px;

  background: #f9fafd;

  shadow-color: #bacfff;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.5;
  shadow-radius: 4px;
  elevation: 2;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const SendMessageButton = styled(RectButton)`
  width: 40px;
  border-radius: 20px;
  background: #4b73ff;

  justify-content: center;
  align-items: center;
`;
