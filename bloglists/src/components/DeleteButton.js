import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ id, token, deleteBlog, title }) => {
  const handleOnClick = async () => {
    await deleteBlog(id, token, title);
  };
  return <button onClick={handleOnClick}>remove</button>;
};
DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default DeleteButton;
