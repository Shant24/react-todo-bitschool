import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//Middlewares
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//Reducers
import taskReducer from './reducers/taskReducer';
import authReducer from './reducers/authReducer';

const reducers = combineReducers({
  task: taskReducer,
  auth: authReducer,
});

const middlewaresArr = [thunk];

process.env.NODE_ENV === 'development' && middlewaresArr.push(logger);

const middlewares = applyMiddleware(...middlewaresArr);

let store;

process.env.NODE_ENV === 'development'
  ? (store = createStore(reducers, composeWithDevTools(middlewares)))
  : (store = createStore(reducers, middlewares));

export default store;
