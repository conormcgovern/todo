import { CREATE, COMPLETE, MOVE } from './constants';

const todoReducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      return create(state, action);

    case COMPLETE:
      return complete(state, action);

    case MOVE:
      return move(state, action);

    default:
      return state;
  }
};

function create(state, action) {
  return action.title.length
    ? [
        ...state,
        {
          id: state.length ? Math.max(...state.map((todo) => todo.id)) + 1 : 0,
          title: action.title,
          complete: false,
        },
      ]
    : state;
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
