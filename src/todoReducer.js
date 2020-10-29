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

    case 'remove':
      return deleteTask(state, action);

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

function deleteTask(state, action) {
  return state.filter((task) => !(task.id === action.id));
}

export default todoReducer;
