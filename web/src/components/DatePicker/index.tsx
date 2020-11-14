import React from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

const DatePicker = (props: DayPickerProps): JSX.Element => {
  return (
    <Container>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        modifiers={{ available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] } }}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
        {...props}
      />
    </Container>
  );
};

export default DatePicker;
