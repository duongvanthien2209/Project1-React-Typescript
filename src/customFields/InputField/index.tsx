import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export interface InputFieldProps {
  field: any;
  form: any;

  type?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

export function InputField({
  field,
  form,
  type,
  label,
  placeholder,
  disabled,
}: InputFieldProps) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <TextField
      id={name}
      sx={{ my: 1, minWidth: 120 }}
      error={showError}
      helperText={showError && errors[name]}
      {...field}
      type={type}
      label={label || ''}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
