import React from 'react';
import styled from 'styled-components';

import TaskTextInput from './TaskTextInput';
import TaskList from './TaskList';
import TaskItem from './TaskItem';

const TasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 40px;
  overflow: hidden;
  h2 {
    color: var(--color-primary);
  }
`;

export default function Tasks({ list, onSubmit, onComplete, onDelete }) {
  const renderTaskItems = () => {
    const tasks = list.tasks;
    const tasksToRender = !list.showCompleted
      ? tasks.filter((task) => !task.complete)
      : tasks;
    return tasksToRender.map((task, index) => (
      <TaskItem
        key={`${task.id}`}
        index={index}
        task={task}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    ));
  };
  return (
    <TasksWrapper>
      <h2>{list.name}</h2>
      <TaskTextInput onSubmit={onSubmit} placeholder="Add a new task" />
      <TaskList>{renderTaskItems()}</TaskList>
    </TasksWrapper>
  );
}
