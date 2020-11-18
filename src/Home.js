import React, { useEffect, useReducer, useState } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import {
  ADD_TASK,
  COMPLETE_TASK,
  MOVE_TASK,
  REMOVE_TASK,
  INIT,
  SET_SELECTED_LIST,
} from './actions';
import api from './api';
import TodoAppBar from './components/TodoAppBar';
import Sidebar from './components/Sidebar';
import TaskTextInput from './components/TaskTextInput';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';
import reducer from './reducer';

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

const LOAD_STATE = {
  IN_PROGRESS: 'in_progress',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function Home({ onSignout }) {
  const [state, dispatch] = useReducer(reducer, []);
  const [loadState, setLoadState] = useState(LOAD_STATE.IN_PROGRESS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (value) => {
    const response = await api.create(value, state.selectedListId);
    dispatch({ type: ADD_TASK, payload: response });
  };

  const handleComplete = (task) => {
    const data = { complete: !task.complete };
    api.update(task.id, data);
    dispatch({ type: COMPLETE_TASK, payload: task });
  };

  const handleDelete = async (taskId, listId) => {
    api.deleteTask(taskId);
    dispatch({
      type: REMOVE_TASK,
      payload: { taskId: taskId, listId: listId },
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch({
      type: MOVE_TASK,
      payload: {
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      },
    });
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleListSelect = (listId) => {
    dispatch({ type: SET_SELECTED_LIST, payload: listId });
  };

  const renderTaskItems = () => {
    const selectedList = state.lists.find(
      (list) => state.selectedListId === list.id
    );
    const tasks = selectedList.tasks;
    const tasksToRender = !selectedList.showCompleted
      ? tasks.filter((task) => !task.complete)
      : tasks;
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
    api.readLists().then((lists) => {
      dispatch({ type: INIT, payload: lists });
      setLoadState(LOAD_STATE.SUCCESS);
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Wrapper>
          <TodoAppBar onMenuClick={handleMenuClick} onSignout={onSignout} />
          {loadState === LOAD_STATE.SUCCESS && (
            <Main>
              <Sidebar
                open={sidebarOpen}
                state={state}
                onListSelect={handleListSelect}
              ></Sidebar>
              <Tasks>
                <h2>Tasks</h2>
                <TaskTextInput
                  onSubmit={handleSubmit}
                  placeholder="Add a new task"
                />
                <TaskList>{renderTaskItems()}</TaskList>
              </Tasks>
            </Main>
          )}
        </Wrapper>
      </DragDropContext>
    </React.Fragment>
  );
}
