import {ADD_USER, LOG_IN, SIGN_OUT} from '../actions/types';

const initialState = {
  signedInUser: {},
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        signedInUser: {
          name: action.mName,
          email: action.mEmail,
          pass: action.mPass,
        },
      };

    case ADD_USER:
      return {
        ...state,
        userList: state.userList.concat({
          name: action.mName,
          email: action.mEmail,
          pass: action.mPass,
        }),
      };

    case SIGN_OUT:
      return {
        ...state,
        signedInUser: {
          name: '',
          email: '',
          pass: '',
        },
      };

    default:
      return state;
  }
};

export default userReducer;
