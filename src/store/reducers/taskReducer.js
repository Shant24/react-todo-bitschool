import * as actionTypes from '../actionTypes';

const defaultState = {
  tasks: [],
  loading: false,
  errorMessage: null,
  successMessage: null,
  addTaskSuccess: false,
  editTaskSuccess: false,
  removeTasksSuccess: false,
  task: null,
  editSingleTaskSuccess: false,
  removeSingleTaskSuccessMessage: null,
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
        removeTasksSuccess: false,
        editSingleTaskSuccess: false,
      };

    case actionTypes.ERROR:
      return { ...state, errorMessage: action.error, loading: false };

    case actionTypes.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks.reverse(),
        task: {},
        loading: false,
      };

    case actionTypes.ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
        loading: false,
        addTaskSuccess: true,
        successMessage: 'Task added successfully!',
      };

    case actionTypes.EDIT_TASK_SUCCESS:
      const getEditedTasks = () => {
        const tasks = [...state.tasks];
        const index = tasks.findIndex(
          (task) => task._id === action.editedTask._id
        );

        tasks[index] = action.editedTask;

        return tasks;
      };
      return {
        ...state,
        tasks: getEditedTasks(),
        loading: false,
        editTaskSuccess: true,
        successMessage: 'Task edited successfully!',
      };

    case actionTypes.REMOVE_TASK_SUCCESS:
      const getTasksAfterRemove = () => {
        const tasks = [...state.tasks];
        return tasks.filter((task) => task._id !== action.task._id);
      };

      return {
        ...state,
        tasks: getTasksAfterRemove(),
        loading: false,
        successMessage: 'Task removed successfully!',
      };

    case actionTypes.REMOVE_SELECTED_TASKS_SUCCESS:
      const tasksAfterRemoveSelected = () => {
        let tasks = [...state.tasks];

        action.checkedTasks.forEach(
          (taskId) => (tasks = tasks.filter((task) => task._id !== taskId))
        );

        return tasks;
      };

      return {
        ...state,
        tasks: tasksAfterRemoveSelected(),
        loading: false,
        successMessage: 'All tasks removed successfully!',
        removeTasksSuccess: true,
      };

    case actionTypes.GET_SINGLE_PAGE_TASK_SUCCESS:
      return {
        ...state,
        task: action.task,
        loading: false,
        removeSingleTaskSuccessMessage: null,
      };

    case actionTypes.EDIT_SINGLE_PAGE_TASK_SUCCESS:
      return {
        ...state,
        task: action.editedTask,
        loading: false,
        editSingleTaskSuccess: true,
        successMessage: 'Task edited successfully!',
      };

    case actionTypes.REMOVE_SINGLE_PAGE_TASK_SUCCESS:
      return {
        ...state,
        task: null,
        loading: false,
        removeSingleTaskSuccessMessage: 'Task removed successfully!',
      };

    default:
      return state;
  }
};

export default taskReducer;
