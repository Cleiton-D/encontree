import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Range } from 'rc-slider';
import { useField } from '@unform/core';

import 'rc-slider/assets/index.css';

import { Container, RangeContent, NotAvailableLabel } from './styles';

type TimeInputRangeValue = {
  value: {
    min: number;
    max: number;
    available?: boolean;
  };
};

type TimeInputRangeProps = {
  name: string;
  label: string;
  available?: boolean;
};

const TimeInputRange = ({
  name,
  label,
  available,
}: TimeInputRangeProps): JSX.Element => {
  const [isAvailable, setIsAvailable] = useState(available);

  const timeRangeRef = useRef<TimeInputRangeValue>({
    value: { min: 7, max: 17, available: !!available },
  });

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: timeRangeRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  const handleChangeTimeRange = useCallback(value => {
    const [min, max] = value;
    const currentValue = timeRangeRef.current.value;
    timeRangeRef.current.value = { ...currentValue, min, max };
  }, []);

  const handleChangeCheckBox = useCallback(() => {
    setIsAvailable(oldState => {
      const currentRefValue = timeRangeRef.current.value;
      timeRangeRef.current.value = {
        ...currentRefValue,
        available: !oldState,
      };

      return !oldState;
    });
  }, []);

  return (
    <Container available={Number(!isAvailable)}>
      <span>{label}</span>
      <RangeContent available={Number(!isAvailable)}>
        <Range
          disabled={!isAvailable}
          min={7}
          max={17}
          marks={{
            '7': '07:00',
            '7.5': '07:30',
            '8': '08:00',
            '8.5': '08:30',
            '9': '09:00',
            '9.5': '09:30',
            '10': '10:00',
            '10.5': '10:30',
            '11': '11:00',
            '11.5': '11:30',
            '12': '12:00',
            '12.5': '12:30',
            '13': '13:00',
            '13.5': '13:30',
            '14': '14:00',
            '14.5': '14:30',
            '15': '15:00',
            '15.5': '15:30',
            '16': '16:00',
            '16.5': '16:30',
            '17': '17:00',
          }}
          defaultValue={[7, 17]}
          step={0.5}
          onChange={handleChangeTimeRange}
        />
      </RangeContent>
      <NotAvailableLabel checked={!isAvailable}>
        <input
          type="checkbox"
          defaultChecked={available}
          onChange={handleChangeCheckBox}
        />
        <span>Não disponível</span>
      </NotAvailableLabel>
    </Container>
  );
};

export default TimeInputRange;
