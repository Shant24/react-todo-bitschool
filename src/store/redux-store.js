import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

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

const middlewares = applyMiddleware(thunkMiddleware, loggerMiddleware);

const store = createStore(reducers, composeWithDevTools(middlewares));

export default store;
