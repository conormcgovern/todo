import { CREATE, COMPLETE, MOVE, INIT } from './constants';

const todoReducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      return create(state, action);

    case COMPLETE:
      return complete(state, action);

    case MOVE:
      return move(state, action);

    case INIT:
      return action.tasks;

    default:
      return state;
  }
};

function create(state, action) {
  return [...state, action.task];
}

function complete(state, action) {
  return state.map((todo) =>
    todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
  );
}

function move(state, action) {
  const fromIndex = action.fromIndex;
  const toIndex = action.toIndex;
  const result = [...state];
  result.splice(fromIndex, 1);
  result.splice(toIndex, 0, state[fromIndex]);
  return result;
}

export default todoReducer;
