import React, { useReducer } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

import NavBar from './NavBar';
import NavItem from './NavItem';
import TextInput from './TextInput';
import TaskItem from './TaskItem';
import IconButton from './IconButton';
import { ReactComponent as SunIcon } from './icons/sun.svg';
import { ReactComponent as MoonIcon } from './icons/moon.svg';
import todoReducer from './todoReducer';
import { CREATE, COMPLETE } from './constants';
import useTheme from './useTheme';

const Title = styled.h2`
  color: var(--color-primary);
`;

const initialState = [
  { id: 1, title: 'First task', complete: false },
  { id: 2, title: 'Second task', complete: false },
  { id: 3, title: 'Third task', complete: false },
];

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [theme, toggleTheme] = useTheme();
  const hideCompleted = false;

  const handleSubmit = (value) => {
    dispatch({ type: CREATE, title: value });
  };

  const handleComplete = (id) => {
    dispatch({ type: COMPLETE, id: id });
  };

  const renderTaskItems = () => {
    const tasksToRender = hideCompleted
      ? state.filter((task) => !task.complete)
      : state;
    return tasksToRender.map((task, index) => (
      <TaskItem key={index} task={task} onComplete={handleComplete} />
    ));
  };

  const themeIcon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;

  return (
    <div>
      <GlobalStyles />
      <NavBar>
        <NavItem>
          <IconButton onClick={toggleTheme}>{themeIcon}</IconButton>
        </NavItem>
      </NavBar>
      <div className="wrapper">
        <Title>Tasks</Title>
        <TextInput onSubmit={handleSubmit} placeholder="Add a new task" />
        {renderTaskItems()}
      </div>
    </div>
  );
}
