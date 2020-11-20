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
} from './actions';
import api from './api';
import TodoAppBar from './components/TodoAppBar';
import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';
import reducer from './reducer';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

export default function Home({ listId, history, onSignout }) {
  const [state, dispatch] = useReducer(reducer, []);
  const [loadState, setLoadState] = useState(LOAD_STATE.IN_PROGRESS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState(listId);

  const handleSubmit = async (value) => {
    const task = {
      id: Math.floor(Math.random() * Math.floor(1000)), // temporary id
      listId: currentListId,
      text: value,
      complete: false,
    };
    dispatch({ type: ADD_TASK, payload: task });
    await api.create(value, currentListId);
    const lists = await api.readLists();
    dispatch({ type: INIT, payload: lists });
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
    history.push('/tasks/' + listId);
  };

  const getCurrentList = () => {
    return listId
      ? state.lists.find((list) => listId === list.id)
      : state.lists[0];
  };

  useEffect(() => {
    api.readLists().then((lists) => {
      dispatch({ type: INIT, payload: lists });
      setCurrentListId(listId ? listId : lists[0].id);
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
                lists={state.lists}
                onListSelect={handleListSelect}
                currentListId={listId}
              ></Sidebar>
              <Tasks
                list={getCurrentList()}
                onSubmit={handleSubmit}
                onComplete={handleComplete}
                onDelete={handleDelete}
              ></Tasks>
            </Main>
          )}
        </Wrapper>
      </DragDropContext>
    </React.Fragment>
  );
}
