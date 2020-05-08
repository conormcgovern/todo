import React from 'react';
import PropTypes from 'prop-types';

export default function NavItem({ children }) {
  return <li>{children}</li>;
}

NavItem.propTypes = {
  children: PropTypes.element,
};
