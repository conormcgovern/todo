import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TaskListWrapper = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--bg);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-secondary);
  }
`;

function TaskList({ children }) {
  return (
    <TaskListWrapper>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </TaskListWrapper>
  );
}

TaskList.propTypes = {
  children: PropTypes.any,
};

export default TaskList;
