const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const defaultState = {};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state };

    case LOG_OUT:
      return { ...state };

    default:
      return { ...state };
  }
};

export default authReducer;
