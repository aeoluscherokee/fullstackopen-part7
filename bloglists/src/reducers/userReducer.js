const initialState = {
  token: '',
  username: '',
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.userData;
    case 'LOGOUT':
      return {
        token: '',
        username: '',
        name: '',
      };
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

export default userReducer;
