import blogService from '../services/blogs';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'ALL_BLOGS':
      return action.data;
    case 'DELETE_BLOG': {
      const updatedBlogs = state.filter((blog) => blog.id !== action.id);
      return updatedBlogs;
    }

    default:
      return state;
  }
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogService.sortBlogs(blogs);
    dispatch({ type: 'ALL_BLOGS', data: sortedBlogs });
  };
};

export const createNewBlog = (response) => {
  return async (dispatch) => {
    dispatch({ type: 'NEW_BLOG', data: response });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_BLOG', id: id });
  };
};

export default blogReducer;
