import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export interface OptionItem {
  value: string | number;
  label: string;
}

export interface SelectFieldProps {
  field: any;
  form: any;

  label?: string;
  disabled?: boolean;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  options: OptionItem[];
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  options: PropTypes.array.isRequired,
};

SelectField.defaultProps = {
  label: '',
  disabled: false,
  variant: 'standard',
  options: [],
};

export function SelectField({
  field,
  form,
  label,
  disabled,
  variant,
  options,
}: SelectFieldProps) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormControl
      variant={variant}
      sx={{ m: 1, minWidth: 120 }}
      disabled={disabled}
      error={showError}
    >
      {label && (
        <InputLabel id={`label-for-select-field-${name}`}>{label}</InputLabel>
      )}
      <Select
        id={name}
        labelId={label && `label-for-select-field-${name}`}
        label={label || ''}
        {...field}
      >
        {options.map((optionItem: OptionItem, index) => (
          <MenuItem key={index} value={optionItem.value}>
            {optionItem.label}
          </MenuItem>
        ))}
      </Select>
      {disabled && <FormHelperText>Disabled</FormHelperText>}
      {showError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
}
