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

let middlewares;
let store;

if (process.env.NODE_ENV === 'development') {
  middlewares = applyMiddleware(thunk, logger);
  store = createStore(reducers, composeWithDevTools(middlewares));
} else {
  middlewares = applyMiddleware(thunk);
  store = createStore(reducers, middlewares);
}

export default store;
