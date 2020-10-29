import React, { useEffect, useReducer, useState } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import NavBar from './components/NavBar';
import NavItem from './components/NavItem';
import TaskTextInput from './components/TaskTextInput';
import TaskItem from './components/TaskItem';
import IconButton from './components/IconButton';
import { ReactComponent as SunIcon } from './icons/sun.svg';
import { ReactComponent as MoonIcon } from './icons/moon.svg';
import todoReducer from './todoReducer';
import { CREATE, COMPLETE, MOVE, REMOVE, INIT } from './constants';
import useTheme from './useTheme';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import { ReactComponent as MenuIcon } from './icons/bars.svg';
import api from './api';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 40px;
  overflow: hidden;
  h2 {
    color: var(--color-primary);
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default function Home({ onSignout }) {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [theme, toggleTheme] = useTheme();
  const hideCompleted = false;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (value) => {
    const response = await api.create(value);
    dispatch({ type: CREATE, task: response });
  };

  const handleComplete = (id) => {
    dispatch({ type: COMPLETE, id: id });
  };

  const handleDelete = async (id) => {
    api.deleteTask(id);
    dispatch({ type: REMOVE, id: id });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch({
      type: MOVE,
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    });
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTaskItems = () => {
    const tasksToRender = hideCompleted
      ? state.filter((task) => !task.complete)
      : state;
    return tasksToRender.map((task, index) => (
      <TaskItem
        key={`${task.id}`}
        index={index}
        task={task}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    ));
  };

  const themeIcon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;

  useEffect(() => {
    api.readAll().then((tasks) => {
      dispatch({ type: INIT, tasks: tasks });
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Wrapper>
          <NavBar>
            <NavItem>
              <IconButton onClick={handleMenuClick}>
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
          <Main>
            <Sidebar open={sidebarOpen}></Sidebar>
            <Tasks>
              <h2>Tasks</h2>
              <TaskTextInput
                onSubmit={handleSubmit}
                placeholder="Add a new task"
              />
              <TaskList>{renderTaskItems()}</TaskList>
            </Tasks>
          </Main>
        </Wrapper>
      </DragDropContext>
    </React.Fragment>
  );
}
