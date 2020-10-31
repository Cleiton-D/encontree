declare module 'react-native-month-year-picker' {
  export type ACTION_DATE_SET = 'dateSetAction';
  export type ACTION_DISMISSED = 'dismissedAction';
  export type ACTION_NEUTRAL = 'neutralAction';
  export type NATIVE_FORMAT = 'M-YYYY';

  export type Event = ACTION_DATE_SET | ACTION_DISMISSED | ACTION_NEUTRAL;

  export type MonthPickerProps = {
    onChange?: (event: Event, value: Date) => void;
    value: Date;
    locale?: string;
    maximumDate?: Date;
    minimumDate: Date;
    okButton?: string;
    cancelButton?: string;
    neutralButton?: string;
  };

  const MonthPicker: (props: MonthPickerProps) => JSX.Element;
  export default MonthPicker;
}
