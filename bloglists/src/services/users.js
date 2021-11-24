import axios from 'axios';
const baseUrl = '/api/users';

const logIn = async (loginData) => {
  const request = await axios.post(baseUrl + '/login', loginData);
  return request.data;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const userService = {
  logIn: logIn,
  getAll: getAll,
};

export default userService;
