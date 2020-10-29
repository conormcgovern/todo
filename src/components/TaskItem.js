import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from './CheckBox';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';
import IconButton from './IconButton';

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

  &[data-rbd-drag-handle-context-id] {
    cursor: pointer;
  }
`;

export default function TaskItem({ index, task, onComplete, onDelete }) {
  const { id, text, complete } = task;
  const handleComplete = () => onComplete(task);
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
          <p>{text}</p>
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </StyledTaskItem>
      )}
    </Draggable>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};
