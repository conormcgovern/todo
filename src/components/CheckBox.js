import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CircleIcon } from '../icons/circle.svg';
import { ReactComponent as CheckIcon } from '../icons/check.svg';
import IconButton from './IconButton';

const StyledCheckBox = styled(IconButton)`
  svg #check {
    opacity: 0;
  }
  :hover {
    svg #check {
      opacity: 87%;
      transition: opacity 100ms ease-in-out;
    }
  }
`;

export default function CheckBox({ onClick, checked }) {
  return (
    <StyledCheckBox onClick={onClick}>
      {checked ? <CheckIcon /> : <CircleIcon />}
    </StyledCheckBox>
  );
}

CheckBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
