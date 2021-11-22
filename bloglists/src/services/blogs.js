import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createNewBlog = async (createDate, token) => {
  const request = await axios.post('/api/blogs', createDate, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return request.data;
};

const updateLike = async (id, updatedData) => {
  const request = await axios.put(`${baseUrl}/likes/${id}`, updatedData);
  return request.data;
};

const deleteBlog = async (id, token) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return request.data;
};

const sortBlogs = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};

const blogService = {
  getAll: getAll,
  createNewBlog: createNewBlog,
  updateLike: updateLike,
  sortBlogs: sortBlogs,
  deleteBlog: deleteBlog,
};

export default blogService;
