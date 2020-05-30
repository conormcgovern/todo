import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIconButton = styled.a`
  width: var(--icon-button-size);
  height: var(--icon-button-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > svg {
    fill: var(--icon-color-primary);
    color: var(--icon-color-secondary);
    opacity: 87%;
    width: var(--icon-size);
    transition: opacity 100ms ease-in-out;
  }
  :hover {
    > svg {
      opacity: 100%;
    }
  }
`;

export default function IconButton({ className, onClick, children }) {
  return (
    <StyledIconButton className={className} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.element,
};
