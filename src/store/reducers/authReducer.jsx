const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const defaultState = {
  user: null,
  isAuth: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.user, isAuth: true };

    case LOG_OUT:
      return { ...state, user: null, isAuth: false };

    default:
      return state;
  }
};

export default authReducer;
