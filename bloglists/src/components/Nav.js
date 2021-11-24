import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const Nav = ({ userData }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const style = {
    display: 'flex',
    flexDirection: 'row',
  };
  return (
    <div style={style}>
      <Link to="/">blogs</Link>
      <Link to="Users">users</Link>
      <div>
        {userData.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};
export default Nav;
