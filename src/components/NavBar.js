import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Nav = styled.nav`
  height: var(--navbar-height);
  background-color: var(--navbar-color);
  padding: 0;
  --icon-color-primary: var(--gray-3);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16), 0 1px 6px rgba(0, 0, 0, 0.23);
  z-index: 1;
`;

const List = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 24px;
`;

export default function NavBar({ children }) {
  return (
    <Nav>
      <List>{children}</List>
    </Nav>
  );
}

NavBar.propTypes = {
  children: PropTypes.element,
};
