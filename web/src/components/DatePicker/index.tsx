import React from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

const DatePicker = (props: DayPickerProps): JSX.Element => {
  return (
    <Container>
      <DayPicker
        weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        modifiers={{ available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] } }}
        months={[
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        {...props}
      />
    </Container>
  );
};

export default DatePicker;
