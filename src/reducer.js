import {
  ADD_TASK,
  COMPLETE_TASK,
  INIT,
  MOVE_TASK,
  REMOVE_TASK,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return initState(action);

    case ADD_TASK:
      return addTask(state, action);

    case REMOVE_TASK:
      return removeTask(state, action);

    case COMPLETE_TASK:
      return completeTask(state, action);

    case MOVE_TASK:
      return moveTask(state, action);
  }
};

const initState = (action) => {
  const lists = action.payload;
  return {
    lists: lists,
  };
};

const addTask = (state, action) => {
  const task = action.payload;
  return {
    ...state,
    lists: state.lists.map((list) => {
      return list.id === task.listId ? addTaskToList(task, list) : list;
    }),
  };
};

const addTaskToList = (task, list) => {
  return {
    ...list,
    tasks: [...list.tasks, task],
  };
};

const removeTask = (state, action) => {
  const { taskId, listId } = action.payload;
  return {
    ...state,
    lists: state.lists.map((list) => {
      return list.id === listId ? removeTaskFromList(taskId, list) : list;
    }),
  };
};

const completeTask = (state, action) => {
  const task = action.payload;
  return {
    ...state,
    lists: state.lists.map((list) => {
      return list.id === task.listId ? completeTaskInList(task.id, list) : list;
    }),
  };
};

const moveTask = (state, action) => {
  const { task, fromIndex, toIndex } = action.payload;
  return {
    ...state,
    lists: state.lists.map((list) => {
      return list.id === task.listId
        ? { ...list, tasks: move(list.tasks, fromIndex, toIndex) }
        : list;
    }),
  };
};

const move = (tasks, fromIndex, toIndex) => {
  const result = [...tasks];
  result.splice(fromIndex, 1);
  result.splice(toIndex, 0, tasks[fromIndex]);
  return result;
};

const completeTaskInList = (taskId, list) => {
  return {
    ...list,
    tasks: list.tasks.map((task) =>
      task.id === taskId ? { ...task, complete: !task.complete } : task
    ),
  };
};

const removeTaskFromList = (taskId, list) => {
  const tasks = list.tasks;
  return {
    ...list,
    tasks: tasks.filter((task) => !(task.id === taskId)),
  };
};

export default reducer;
