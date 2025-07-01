import React from 'react';
import DropdownInput from './ui/dropdown';
import CheckboxInput from './ui/checkbox';
import RadioInput from './ui/radio-input';

export type Option = {
  label: string;
  value: string;
  image?: string;
};

export type InputProps = {
  label: string;
  type: 'dropdown' | 'checkbox' | 'radio';
  options: Option[];
  selectedValue?: string;
  selectedValues?: string[];
  onChange: (value: string | string[]) => void;
};

export const SelectableInput: React.FC<InputProps> = (props) => {
  const { type } = props;

  if (type === 'dropdown') return <DropdownInput {...props} />;
  if (type === 'checkbox') return <CheckboxInput {...props} />;
  if (type === 'radio') return <RadioInput {...props} />;
  return null;
};

export default SelectableInput;
