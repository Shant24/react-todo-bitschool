import * as actionTypes from '../types/taskTypes';
import { AUTH_LOADING, LOGOUT_SUCCESS } from '../types/authTypes';

const defaultState = {
  tasks: [],
  task: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  addTaskSuccess: false,
  editTaskSuccess: false,
  removeTaskSuccess: false,
  removeTasksSuccess: false,
};

const taskReducer = (state = defaultState, action) => {
  const replaceEditedTask = (params) => {
    if (action.from === 'single') {
      return {
        ...params,
        task: action.editedTask,
      };
    } else {
      const newTasks = state.tasks.map((task) =>
        task._id === action.editedTask._id ? action.editedTask : task
      );

      return {
        ...params,
        tasks: newTasks,
      };
    }
  };

  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        errorMessage: null,
        successMessage: null,
        addTaskSuccess: false,
        editTaskSuccess: false,
        removeTaskSuccess: false,
        removeTasksSuccess: false,
      };

    case actionTypes.ERROR:
      return { ...state, errorMessage: action.error, loading: false };

    case actionTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        task: {},
        loading: false,
      };

    case actionTypes.GET_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
        loading: false,
      };

    case actionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        loading: false,
        addTaskSuccess: true,
        successMessage: 'Task created successfully!',
      };

    case actionTypes.EDIT_TASK_SUCCESS:
      const editParams = {
        ...state,
        loading: false,
        editTaskSuccess: true,
        successMessage: 'Task edited successfully!',
      };

      return replaceEditedTask(editParams);

    case actionTypes.CHANGE_TASK_STATUS_SUCCESS:
      const changeParams = {
        ...state,
        loading: false,
        successMessage:
          action.editedTask.status === 'done'
            ? 'Congratulations, you have completed the task 🎉!!!'
            : 'The task is active now!!!',
      };

      return replaceEditedTask(changeParams);

    case actionTypes.REMOVE_TASK_SUCCESS:
      const removeParams = {
        ...state,
        loading: false,
        successMessage: 'Task removed successfully!',
      };

      if (action.from === 'single') {
        return {
          ...removeParams,
          removeTaskSuccess: true,
        };
      } else {
        const newTasks = state.tasks.filter(
          (task) => task._id !== action.taskId
        );

        return {
          ...removeParams,
          tasks: newTasks,
        };
      }

    case actionTypes.REMOVE_SELECTED_TASKS_SUCCESS:
      let newTasks = [...state.tasks];

      action.checkedTasks.forEach(
        (taskId) => (newTasks = newTasks.filter((task) => task._id !== taskId))
      );

      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMessage: 'Tasks removed successfully!',
        removeTasksSuccess: true,
      };

    case AUTH_LOADING:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
        addTaskSuccess: false,
        editTaskSuccess: false,
        removeTaskSuccess: false,
        removeTasksSuccess: false,
      };

    case LOGOUT_SUCCESS:
      return defaultState;

    default:
      return state;
  }
};

export default taskReducer;
