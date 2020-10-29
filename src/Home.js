import React, { useEffect, useReducer, useState } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import { CREATE, COMPLETE, MOVE, REMOVE, INIT } from './constants';
import api from './api';
import todoReducer from './todoReducer';
import TodoAppBar from './components/TodoAppBar';
import Sidebar from './components/Sidebar';
import TaskTextInput from './components/TaskTextInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';

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
  const hideCompleted = false;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (value) => {
    const response = await api.create(value);
    dispatch({ type: CREATE, task: response });
  };

  const handleComplete = (task) => {
    const data = { complete: !task.complete };
    api.update(task.id, data);
    dispatch({ type: COMPLETE, id: task.id });
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
          <TodoAppBar onMenuClick={handleMenuClick} onSignout={onSignout} />
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
