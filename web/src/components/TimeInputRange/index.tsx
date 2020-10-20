import React, { useCallback, useEffect, useState } from 'react';
import { Range } from 'rc-slider';
import { useField } from '@unform/core';

import 'rc-slider/assets/index.css';

import { Container, RangeContent, NotAvailableLabel } from './styles';

type TimeInputRangeState = {
  min: number;
  max: number;
  available?: boolean;
};

type TimeInputRangeProps = {
  name: string;
  label: string;
};

const TimeInputRange = ({ name, label }: TimeInputRangeProps): JSX.Element => {
  const [data, setData] = useState<TimeInputRangeState>({
    min: 7,
    max: 17,
    available: true,
  });

  const { fieldName, defaultValue: unformDefault, registerField } = useField(
    name,
  );

  useEffect(() => {
    registerField<TimeInputRangeState>({
      name: fieldName,
      ref: { value: { ...data } },
      path: 'value',
    });
  }, [registerField, fieldName, data]);

  useEffect(() => {
    if (unformDefault) {
      setData(unformDefault);
    }
  }, [unformDefault]);

  const handleChangeTimeRange = useCallback(value => {
    const [min, max] = value;
    setData(oldState => ({ ...oldState, min, max }));
  }, []);

  const handleChangeCheckBox = useCallback(() => {
    setData(oldState => ({ ...oldState, available: !oldState.available }));
  }, []);

  return (
    <Container available={Number(!data.available)}>
      <span>{label}</span>
      <RangeContent available={Number(!data.available)}>
        <Range
          disabled={!data.available}
          min={7}
          max={17}
          marks={{
            '7': '07:00',
            '8': '08:00',
            '9': '09:00',
            '10': '10:00',
            '11': '11:00',
            '12': '12:00',
            '13': '13:00',
            '14': '14:00',
            '15': '15:00',
            '16': '16:00',
            '17': '17:00',
          }}
          value={[data.min, data.max]}
          step={1}
          onChange={handleChangeTimeRange}
        />
      </RangeContent>
      <NotAvailableLabel checked={!data.available}>
        <input
          type="checkbox"
          defaultChecked={data.available}
          onChange={handleChangeCheckBox}
        />
        <span>Não disponível</span>
      </NotAvailableLabel>
    </Container>
  );
};

export default TimeInputRange;
