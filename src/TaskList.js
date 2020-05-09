import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

function TaskList({ children }) {
  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

TaskList.propTypes = {
  children: PropTypes.any,
};

export default TaskList;
