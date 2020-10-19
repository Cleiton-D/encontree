import React, { OptionHTMLAttributes } from 'react';

export type OptionProps = OptionHTMLAttributes<HTMLOptionElement> & {
  value: string;
  children: React.ReactNode;
};

const ComboOption: React.FC<OptionProps> = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

export default ComboOption;
