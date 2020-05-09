import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from './CheckBox';

const StyledTaskItem = styled.div`
  display: grid;
  grid-template-columns: var(--icon-button-size) minmax(min-content, 100%) 48px;
  grid-column-gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--color-secondary);
  transition: background-color 100ms ease-in-out;
  min-height: var(--min-tap-target-height);
  background-color: ${(props) =>
    props.isDragging ? 'var(--color-secondary)' : 'var(background-color)'};

  p {
    opacity: ${(props) => (props.done ? '50%' : '87%')};
    text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
  }

  :hover {
    background-color: var(--color-secondary);
  }
`;

export default function TaskItem({ index, task, onComplete }) {
  const { id, title, complete } = task;
  const handleComplete = () => onComplete(id);
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <StyledTaskItem
          done={complete}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CheckBox checked={complete} onClick={handleComplete} />
          <p>{title}</p>
        </StyledTaskItem>
      )}
    </Draggable>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};
