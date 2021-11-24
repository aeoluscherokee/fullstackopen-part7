import React, { useEffect } from 'react';
import Blog from './components/Blog';
import LogIn from './components/LogIn';
import CreateNewBlog from './components/CreateNewBlog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './reducers/blogReducer';

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <LogIn>
        <CreateNewBlog />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </LogIn>
    </>
  );
};

export default App;
