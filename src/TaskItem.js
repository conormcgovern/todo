import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckBox from './CheckBox';

const StyledTaskItem = styled.div`
  display: grid;
  grid-template-columns: var(--icon-button-size) minmax(min-content, 100%) 48px;
  grid-column-gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--color-secondary);
  transition: background-color 100ms ease-in-out;
  min-height: var(--min-tap-target-height);

  p {
    opacity: ${(props) => (props.done ? '50%' : '87%')};
    text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
  }

  :hover {
    background-color: var(--color-secondary);
  }
`;

export default function TaskItem({ task, onComplete }) {
  const { id, title, complete } = task;
  const handleComplete = () => onComplete(id);
  return (
    <StyledTaskItem done={complete}>
      <CheckBox checked={complete} onClick={handleComplete} />
      <p>{title}</p>
    </StyledTaskItem>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }).isRequired,

  onComplete: PropTypes.func.isRequired,
};
