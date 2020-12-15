import * as actionTypes from '../actionTypes';

const defaultState = {
  user: {
    name: 'Shant',
    surname: 'Sargsyan',
    avatar:
      'https://scontent.fevn8-1.fna.fbcdn.net/v/t1.0-1/c12.53.192.192a/p240x240/93404452_2966084290148011_477263264217038848_o.jpg?_nc_cat=106&ccb=2&_nc_sid=7206a8&_nc_ohc=cawxf8R7niwAX-iZ1wd&_nc_ht=scontent.fevn8-1.fna&tp=27&oh=80976e1e11d935a314dd9d9d77785bd6&oe=5FFA5FFC',
  },
  isAuth: true,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, user: action.user, isAuth: true };

    case actionTypes.SIGN_OUT:
      return { ...state, isAuth: false };

    default:
      return state;
  }
};

export default authReducer;
