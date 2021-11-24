import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog, updateLikes } from '../reducers/blogReducer';
import { showNotification } from '../reducers/notificationReducer';
import blogService from '../services/blogs';
import Comment from './Comment';

const BlogView = () => {
  const id = useParams().id;
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      const response = await blogService.updateLike(blog.id, updatedBlog);
      dispatch(updateLikes(blog.id, response.likes));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, userData.token);
        dispatch(deleteBlog(blog.id));
        dispatch(
          showNotification(
            {
              style: 'success',
              message: `a blog ${blog.title} has been deleted`,
            },
            3
          )
        );
      } catch (error) {
        dispatch(
          showNotification(
            {
              style: 'error',
              message: `a blog ${blog.title} is not existed`,
            },
            3
          )
        );
      }
    } else return;
  };

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes
        <button className="likeButton" onClick={handleLike}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {userData.name === blog.user.name ? (
        <button onClick={handleDelete}>remove</button>
      ) : null}
      <Comment blogId={blog.id} />
    </>
  );
};

export default BlogView;
