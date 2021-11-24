import userService from '../services/users';

const initialState = {
  allUsers: [],
  currentUser: {
    token: '',
    username: '',
    name: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.userData };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: {
          token: '',
          username: '',
          name: '',
        },
      };
    case 'ALL_USERS':
      return { ...state, allUsers: action.data };
    default:
      return state;
  }
};

export const login = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      userData: userData,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll();
    dispatch({
      type: 'ALL_USERS',
      data: response,
    });
  };
};

export default userReducer;
