import React, { useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container } from './styles';

const DatePicker = (): JSX.Element => {
  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    console.log(day, modifiers);
  }, []);

  return (
    <Container>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        disabledDays={[{ daysOfWeek: [0, 6] }]}
        onDayClick={handleDayClick}
        modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
        fromMonth={new Date()}
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
      />
    </Container>
  );
};

export default DatePicker;
