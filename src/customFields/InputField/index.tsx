import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Field } from 'formik';

export interface InputFieldProps {
  field: any;
  form: any;

  classType?: string;
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
  classType: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  classType: '',
};

export function InputField({
  field,
  form,
  type,
  label,
  placeholder,
  disabled,
  classType,
}: InputFieldProps) {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    // <TextField
    //   id={name}
    //   sx={{ my: 1, minWidth: 120 }}
    //   error={showError}
    //   helperText={showError && errors[name]}
    //   {...field}
    //   className={classType || ''}
    //   type={type}
    //   label={label || ''}
    //   placeholder={placeholder}
    //   disabled={disabled}
    // />

    <Field
      className={classType || ''}
      id={name}
      {...field}
      type={type}
      label={label || ''}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
