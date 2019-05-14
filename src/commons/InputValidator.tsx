import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import translate from 'counterpart';

function InputValidator(props) {
  const {
    error,
    validate,
    type,
    id,
    value,
    onChange,
    placeholder,
    required,
    isValid,
    onBlur,
  } = props;

  const [hasError, setError] = useState(false);

  const validatePassword = () => value && value.length >= 6;

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(value);
    return re.test(value);
  };

  const renderError = () => {
    if (hasError && required && !value) {
      return <small className="text-danger">{translate('validation.input/value-required')}</small>;
    }
    if (hasError) {
      let messageError = error;

      if (type === 'email') {
        messageError = 'auth/email-invalid';
      } else if (type === 'password') {
        messageError = 'auth/password-min-length';
      }

      return (
        <small hidden={!hasError} className="text-danger">
          {translate(`validation.${messageError}`)}
        </small>
      );
    }
    return false;
  };

  isValid(!hasError);

  return (
    <>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => {
          if (required && !value) {
            setError(true);
          } else if (type === 'email') {
            setError(!validateEmail());
          } else if (type === 'password') {
            setError(!validatePassword());
          } else {
            setError(!validate());
          }
          onBlur();
        }}
      />
      {renderError()}
    </>
  );
}

InputValidator.defaultProps = {
  placeholder: '',
  error: '',
  type: 'input',
  validate: () => true,
  onBlur: () => true,
  required: false,
};

InputValidator.propTypes = {
  validate: PropTypes.func,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  isValid: PropTypes.func.isRequired,
};

export default InputValidator;
