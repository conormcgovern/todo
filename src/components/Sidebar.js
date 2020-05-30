import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../icons/bars.svg';
import { ReactComponent as ListIcon } from '../icons/list.svg';
import { ReactComponent as AddIcon } from '../icons/plus.svg';
import IconButton from './IconButton';
import NavItem from './NavItem';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    props.open ? 'var(--sidebar-width-open)' : 'var(--sidebar-width-closed)'};
  height: 100%;
  background-color: var(--color-secondary);
  opacity: 87%;
  transition: width 250ms ease-in-out;
  overflow: hidden;

  li {
    margin: 0 1rem;
  }
`;

function Sidebar({ open, toggleOpen }) {
  return (
    <StyledSidebar open={open}>
      <ul>
        <NavItem>
          <h3>Lists</h3>
        </NavItem>
        <NavItem>
          <IconButton>
            <ListIcon></ListIcon>
          </IconButton>
          <p>Tasks</p>
        </NavItem>
        <NavItem>
          <IconButton>
            <AddIcon></AddIcon>
          </IconButton>
          <p>New list</p>
        </NavItem>
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
