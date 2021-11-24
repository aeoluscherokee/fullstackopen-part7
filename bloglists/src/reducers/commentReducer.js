import blogService from '../services/blogs';

const initialState = [];

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_COMMENTS':
      return action.data;
    case 'ADD_COMMENT':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getAllComments = () => {
  return async (dispatch) => {
    const response = await blogService.getComments();
    dispatch({ type: 'ALL_COMMENTS', data: response });
  };
};

export const addComment = (comment) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_COMMENT', data: comment });
  };
};

export default commentReducer;
