import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from '../hooks';
import { addComment } from '../reducers/commentReducer';
import blogService from '../services/blogs';

const Comment = ({ blogId }) => {
  const comments = useSelector(({ comments }) =>
    comments.filter((comment) => comment.blog.id === blogId)
  );
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const comment = useField('text');

  const handleComment = async () => {
    const response = await blogService.addComment(
      blogId,
      { comment: comment.value },
      userData.token
    );
    dispatch(addComment(response));
    comment.onReset();
  };
  return (
    <>
      <h3>comments</h3>
      <input {...comment} placeholder="leave a comment" />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Comment;
