import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Nav = styled.nav`
  height: var(--navbar-height);
  background-color: var(--navbar-color);
  padding: 0;
  --icon-color-primary: var(--gray-3);
`;

const List = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
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
