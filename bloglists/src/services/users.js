import axios from 'axios';
const baseUrl = '/api/users';

const logIn = async (loginData) => {
  const request = await axios.post(baseUrl + '/login', loginData);
  return request.data;
};

const userService = {
  logIn: logIn,
};

export default userService;
