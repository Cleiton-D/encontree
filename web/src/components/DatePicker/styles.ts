import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 38rem;

    .DayPicker {
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0px 0px 4px #cddcff;
    }
    .DayPicker-wrapper {
      padding-bottom: 0;
    }
    .DayPicker-WeekdaysRow .DayPicker-Weekday {
      color: #666;
    }

    .DayPicker,
    .DayPicker-Month {
      width: 100%;
    }
    .DayPicker-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 1.6rem;
    }

    .DayPicker-Month .DayPicker-Caption > div {
      font-size: 2.2rem;
      font-weight: ${theme.font.medium};
      color: #333333;
    }

    .DayPicker-Day,
    .DayPicker-Weekday {
      font-size: 1.6rem;
      font-weight: ${theme.font.medium};
      width: 4rem;
      height: 4rem;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: #e5e8ef;
      border-radius: 0.8rem;
    }
    .DayPicker-Day--today {
      font-weight: normal;
    }
    .DayPicker-Day--disabled {
      color: #666360 !important;
      background: transparent !important;
    }
    .DayPicker-Day--selected {
      background: #ff9000 !important;
      border-radius: 10px;
      color: #232129 !important;
    }
  `}
`;
