import React from 'react';
import Notification from './Notification';
import PropTypes from 'prop-types';

const Login = ({ notification, handleSubmit, handleOnChange, loginData }) => {
  return (
    <div>
      <h1>log in to application</h1>
      <Notification notification={notification} />
      <form onSubmit={handleSubmit}>
        username
        <input
          id="username"
          name="username"
          onChange={handleOnChange}
          value={loginData.username}
        ></input>
        password
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleOnChange}
          value={loginData.password}
        ></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  notification: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
};

export default Login;
