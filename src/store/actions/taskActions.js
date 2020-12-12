import { isMobile } from 'react-device-detect';
import request from '../../helpers/request';
import * as actionTypes from '../actionTypes';

const apiUrl = isMobile
  ? process.env.REACT_APP_API_MOBILE_URL
  : process.env.REACT_APP_API_WEB_URL;

export const getTasks = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task`)
    .then((tasks) => dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks }))
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};

export const getSingleTask = (taskId) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task/${taskId}`)
    .then((task) => dispatch({ type: actionTypes.GET_TASK_SUCCESS, task }))
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};

export const editTask = (taskId, data, from) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task/${taskId}`, 'PUT', data)
    .then((editedTask) =>
      dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, editedTask, from })
    )
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};

export const addTask = (data) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task`, 'POST', data)
    .then((task) => dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task }))
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};

export const removeTask = (taskId, from) => (dispatch) => () => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task/${taskId}`, 'DELETE')
    .then(() =>
      dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId, from })
    )
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};

export const removeSelectedTasks = (checkedTasks) => (dispatch) => () => {
  dispatch({ type: actionTypes.LOADING });

  request(`${apiUrl}/task`, 'PATCH', { tasks: [...checkedTasks] })
    .then(() =>
      dispatch({
        type: actionTypes.REMOVE_SELECTED_TASKS_SUCCESS,
        checkedTasks,
      })
    )
    .catch((err) => dispatch({ type: actionTypes.ERROR, error: err.message }));
};
