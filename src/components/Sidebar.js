import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ListIcon } from '../icons/list.svg';
import { ReactComponent as AddIcon } from '../icons/plus.svg';
import IconButton from './IconButton';
import NavItem from './NavItem';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--color-secondary);
  transition: margin 200ms ease-in-out;
  overflow: hidden;
  margin-left: ${(props) => (props.open ? 0 : 'var(--sidebar-left-margin)')};
`;

const SidebarItem = styled(NavItem)`
  padding: 0 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? 'var(--color-tertiary)' : 'none'};
  p {
    color: ${(props) =>
      props.selected ? 'var(--color-primary)' : 'var(--color-text)'};
    font-weight: ${(props) => (props.selected ? '500' : 'normal')};
  }
  :hover {
    opacity: 87%;
    background-color: var(--bg);
  }
`;

function Sidebar({ open }) {
  return (
    <StyledSidebar open={open}>
      <ul>
        <SidebarItem>
          <h3>Lists</h3>
        </SidebarItem>
        <SidebarItem selected>
          <IconButton>
            <ListIcon></ListIcon>
          </IconButton>
          <p>Tasks</p>
        </SidebarItem>
        <SidebarItem>
          <IconButton>
            <ListIcon></ListIcon>
          </IconButton>
          <p>Groceries</p>
        </SidebarItem>
        <SidebarItem>
          <IconButton>
            <AddIcon></AddIcon>
          </IconButton>
          <p>New list</p>
        </SidebarItem>
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
