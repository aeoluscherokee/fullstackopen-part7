import React from 'react';
import PropTypes from 'prop-types';

const LikeButton = ({ blog, updateLike }) => {
  const handleOnClick = async () => {
    await updateLike(blog);
  };
  return (
    <button className="likeButton" onClick={handleOnClick}>
      Like
    </button>
  );
};

export default LikeButton;
