import todoReducer from './todoReducer';
import { CREATE, MOVE } from './constants';

describe('todoReducer', () => {
  it('create', () => {
    const state = [];
    const action = {
      type: CREATE,
      title: 'first task',
    };
    const newState = todoReducer(state, action);
    expect(newState).toEqual([
      {
        id: 0,
        title: action.title,
        complete: false,
      },
    ]);
  });

  it('move from index 0 to index 2', () => {
    const state = [1, 2, 3, 4];
    const action = {
      type: MOVE,
      fromIndex: 0,
      toIndex: 2,
    };
    const newState = todoReducer(state, action);
    expect(newState).toHaveLength(4);
    expect(newState).toEqual([2, 3, 1, 4]);
    expect(newState).not.toEqual(state);
  });

  it('move from index 2 to index 0', () => {
    const state = [1, 2, 3, 4];
    const action = {
      type: MOVE,
      fromIndex: 2,
      toIndex: 0,
    };
    const newState = todoReducer(state, action);
    expect(newState).toHaveLength(4);
    expect(newState).toEqual([3, 1, 2, 4]);
  });
});
