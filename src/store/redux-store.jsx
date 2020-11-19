import { createStore, combineReducers, applyMiddleware } from 'redux';

//Middlewares
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//Reducers
import taskReducer from './reducers/taskReducer';
import authReducer from './reducers/authReducer';

const reducers = combineReducers({
  task: taskReducer,
  auth: authReducer,
});

const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(reducers, middlewares);

window.store = store;

export default store;
