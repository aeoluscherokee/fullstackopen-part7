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
    case 'UPDATE_LIKE': {
      const updatedBlogs = state.map((blog) => {
        if (blog.id === action.id) {
          return { ...blog, likes: action.likes };
        } else return blog;
      });
      const sortedBlogs = blogService.sortBlogs(updatedBlogs);
      return sortedBlogs;
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

export const updateLikes = (id, likes) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_LIKE', id: id, likes: likes });
  };
};

export default blogReducer;
