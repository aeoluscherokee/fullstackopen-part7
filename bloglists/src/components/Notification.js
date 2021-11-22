import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  const errorStyle = {
    color: 'red',
    border: '2px solid red',
    borderRadius: 5,
    padding: '5px',
    fontSize: '20px',
    backgroundColor: 'lightgrey',
  };
  const successStyle = {
    color: 'green',
    border: '2px solid green',
    borderRadius: 5,
    padding: '5px',
    fontSize: '20px',
    backgroundColor: 'lightgrey',
  };
  return (
    <div>
      {notification.style ? (
        <p style={notification.style === 'error' ? errorStyle : successStyle}>
          {notification.message}
        </p>
      ) : null}
    </div>
  );
};

export default Notification;
