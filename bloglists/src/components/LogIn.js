import React from 'react';
import Notification from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from '../hooks';
import { showNotification } from '../reducers/notificationReducer';
import { login, logout } from '../reducers/userReducer';
import userService from '../services/users';

const Login = (props) => {
  const username = useField('text');
  const password = useField('password');
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: username.value,
      password: password.value,
    };
    try {
      const response = await userService.logIn(loginData);
      dispatch(login(response));
    } catch (error) {
      dispatch(
        showNotification(
          { style: 'error', message: error.response.data.error },
          3
        )
      );
      username.onReset();
      password.onReset();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {userData.username ? (
        <div>
          <h2>blogs</h2>
          <div>
            <Notification />
          </div>
          <p>
            {userData.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {props.children}
        </div>
      ) : (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <form onSubmit={handleSubmit}>
            username
            <input id="username" name="username" {...username}></input>
            password
            <input id="password" name="password" {...password}></input>
            <button type="submit">submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
