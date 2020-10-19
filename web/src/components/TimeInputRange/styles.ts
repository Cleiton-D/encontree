import styled, { css } from 'styled-components';

type ContainerProps = {
  available: number;
};

export const Container = styled.div<ContainerProps>`
  ${({ theme, available }) => css`
    display: flex;
    margin-bottom: 3rem;
    align-items: center;

    > span {
      font-weight: ${theme.font.medium};
      width: 12rem;
      color: #333;
      margin-right: 20px;
      font-size: 1.8rem;
      display: inline-block;

      ${available &&
      css`
        color: #777;
      `}
    }
  `}
`;

type RangeContentProps = {
  available: number;
};
export const RangeContent = styled.div<RangeContentProps>`
  ${({ available }) => css`
    flex: 1;
    align-self: flex-end;
    margin-right: 1.5rem;

    ${available && 'filter: grayscale(0.6);'}

    .rc-slider .rc-slider-handle {
      border: solid 2px #f7bd43;
    }
    .rc-slider .rc-slider-handle.rc-slider-handle-dragging {
      box-shadow: 0 0 0 5px #ffd887;
    }

    .rc-slider .rc-slider-track {
      background-color: #f7bd43;
    }

    .rc-slider .rc-slider-step .rc-slider-dot.rc-slider-dot-active {
      border-color: #f7bd43;
    }
  `}
`;

type CheckBoxProps = {
  checked?: boolean;
};
export const NotAvailableLabel = styled.label<CheckBoxProps>`
  ${({ checked }) => css`
    display: flex;
    align-items: center;
    cursor: pointer;

    > span {
      margin-left: 0.5rem;
      color: #999;
      font-size: 1.4rem;
    }

    &:hover > span {
      color: #8489ad;
    }

    &:hover::before {
      border-color: #dae0f7;
      box-shadow: 0px 0px 2px #829eff;
    }

    &::before {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid #ccc;
      background: #fff;

      ${checked &&
      css`
        content: '\\2713';
        background: #4b73ff;
        color: #fff;
        font-size: 1.6rem;
        font-weight: bold;
        display: flex;
        align-items: center;
      `};
    }

    > input {
      display: none;
    }
  `}
`;
