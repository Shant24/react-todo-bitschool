const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_NEW_TASK_MODAL = 'TOGGLE_NEW_TASK_MODAL';
const CHECK_TASK = 'CHECK_TASK';
const REMOVE_SELECTED_TASKS = 'REMOVE_SELECTED_TASKS';
const TOGGLE_CONFIRM = 'TOGGLE_CONFIRM';
const CHECK_TASK_FOR_EDIT = 'CHECK_TASK_FOR_EDIT';
const SAVE_TASK_AFTER_EDIT = 'SAVE_TASK_AFTER_EDIT';

const defaultState = {
  tasks: null,
  checkedTasks: new Set(),
  showConfirm: false,
  editTask: null,
  openNewTaskModal: false,
};

const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.tasks };

    case ADD_TASK:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        openNewTaskModal: false,
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: [...action.tasks],
      };

    case TOGGLE_NEW_TASK_MODAL:
      return {
        ...state,
        openNewTaskModal: !state.openNewTaskModal,
      };

    case CHECK_TASK:
      return {
        ...state,
        checkedTasks: action.checkedTasks,
      };

    case TOGGLE_CONFIRM:
      return {
        ...state,
        showConfirm: !state.showConfirm,
      };

    case REMOVE_SELECTED_TASKS:
      return {
        ...state,
        tasks: action.tasks,
        checkedTasks: action.checkedTasks,
        showConfirm: false,
      };

    case CHECK_TASK_FOR_EDIT:
      return {
        ...state,
        editTask: action.task,
      };

    case SAVE_TASK_AFTER_EDIT:
      return {
        ...state,
        tasks: action.tasks,
        editTask: null,
      };

    default:
      return state;
  }
};

export default taskReducer;

//actions
export const getTasks = () => (dispatch) => {
  fetch('http://localhost:3001/task')
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw data.error;

      dispatch({ type: GET_TASKS, tasks: data.reverse() });
    })
    .catch((err) => console.log(err));
};

export const addTask = (data) => (dispatch) => {
  fetch('http://localhost:3001/task', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((task) => {
      if (task.error) throw task.error;

      dispatch({ type: ADD_TASK, task });
    })
    .catch((err) => console.log(err));
};

export const removeTask = (taskId) => (dispatch, getState) => () => {
  fetch(`http://localhost:3001/task/${taskId}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw data.error;

      const newTasks = getState().task.tasks.filter(
        (task) => taskId !== task._id
      );

      dispatch({ type: REMOVE_TASK, tasks: newTasks });
    })
    .catch((err) => console.log(err));
};

export const toggleNewTaskModal = () => (dispatch) => {
  dispatch({ type: TOGGLE_NEW_TASK_MODAL });
};

export const checkTask = (taskId) => (dispatch, getState) => () => {
  const checkedTasks = new Set(getState().task.checkedTasks);

  checkedTasks.has(taskId)
    ? checkedTasks.delete(taskId)
    : checkedTasks.add(taskId);

  dispatch({ type: CHECK_TASK, checkedTasks });
};

export const toggleConfirm = () => (dispatch) => {
  dispatch({ type: TOGGLE_CONFIRM });
};

export const removeSelectedTasks = () => (dispatch, getState) => {
  const checkedTasks = new Set(getState().task.checkedTasks);

  fetch('http://localhost:3001/task/', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tasks: [...checkedTasks] }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw data.error;

      let tasks = [...getState().task.tasks];

      checkedTasks.forEach(
        (taskId) => (tasks = tasks.filter((task) => task._id !== taskId))
      );

      checkedTasks.clear();

      dispatch({ type: REMOVE_SELECTED_TASKS, tasks, checkedTasks });
    })
    .catch((err) => console.log(err));
};

export const checkTaskForEdit = (task) => (dispatch) => () => {
  dispatch({ type: CHECK_TASK_FOR_EDIT, task });
};

export const saveTaskAfterEdit = (taskId, data) => (dispatch, getState) => {
  fetch(`http://localhost:3001/task/${taskId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((editedTask) => {
      if (editedTask.error) throw editedTask.error;

      const tasks = [...getState().task.tasks];
      const findIndex = tasks.findIndex((task) => task._id === editedTask._id);

      tasks[findIndex] = editedTask;

      dispatch({ type: SAVE_TASK_AFTER_EDIT, tasks });
    })
    .catch((err) => console.log(err));
};
