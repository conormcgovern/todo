import React from 'react';

import useTheme from '../useTheme';
import NavBar from './NavBar';
import NavItem from './NavItem';
import IconButton from './IconButton';
import { ReactComponent as MenuIcon } from '../icons/bars.svg';
import { ReactComponent as SunIcon } from '../icons/sun.svg';
import { ReactComponent as MoonIcon } from '../icons/moon.svg';

export default function TodoAppBar({ onMenuClick, onSignout }) {
  const [theme, toggleTheme] = useTheme();
  const themeIcon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;
  return (
    <NavBar>
      <NavItem>
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      </NavItem>
      <NavItem className="push-right">
        <IconButton onClick={toggleTheme}>{themeIcon}</IconButton>
      </NavItem>
      <NavItem>
        <button onClick={onSignout}>Sign out</button>
      </NavItem>
    </NavBar>
  );
}
