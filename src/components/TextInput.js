import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  font-size: inherit;
  outline: none;
  border: none;
  color: var(--color-text);
  background-color: inherit;
  height: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  ::placeholder {
    color: var(--color-primary);
  }
  :focus::placeholder {
    color: var(--color-text);
  }
`;

export default function TextInput({ onSubmit, placeholder }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        id="input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
      />
    </form>
  );
}

TextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
