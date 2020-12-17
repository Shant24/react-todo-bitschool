import * as actionTypes from '../actionTypes';

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

      if (action.from === 'single') {
        return {
          ...editParams,
          task: action.editedTask,
        };
      } else {
        const newTasks = state.tasks.map((task) =>
          task._id === action.editedTask._id ? action.editedTask : task
        );

        return {
          ...editParams,
          tasks: newTasks,
        };
      }

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

    default:
      return state;
  }
};

export default taskReducer;
