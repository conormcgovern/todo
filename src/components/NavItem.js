import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavItemWrapper = styled.li`
  display: flex;
  align-items: center;
  > * {
    margin-right: 0.8rem;
  }
`;

export default function NavItem({ children, className, onClick }) {
  return (
    <NavItemWrapper className={className} onClick={onClick}>
      {children}
    </NavItemWrapper>
  );
}

NavItem.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};
