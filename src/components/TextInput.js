import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from './IconButton';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';

const Input = styled.input`
  font-size: inherit;
  outline: none;
  border: none;
  color: var(--color-text);
  background-color: inherit;
  height: 100%;
  ::placeholder {
    color: var(--color-primary);
  }
  :focus::placeholder {
    color: var(--color-text);
  }
`;

const InputWrapper = styled.div`
  min-height: 52px;
  display: grid;
  grid-template-columns: var(--icon-button-size) 1fr;
  grid-column-gap: 24px;
  align-items: center;
  border-bottom: 1px solid;
  border-color: var(--color-secondary);
  transition: border-color 100ms ease-in-out;

  :focus-within {
    border-color: var(--color-primary);
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
      <InputWrapper>
        <label htmlFor="input">
          <IconButton>
            <PlusIcon />
          </IconButton>
        </label>
        <Input
          type="text"
          id="input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </InputWrapper>
    </form>
  );
}

TextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
