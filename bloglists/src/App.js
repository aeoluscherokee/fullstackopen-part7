import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Blog from './components/Blog';
import LogIn from './components/LogIn';
import Users from './components/Users';
import UserView from './components/UserView';
import BlogView from './components/BlogView';
import Nav from './components/Nav';
import Notification from './components/Notification';
import CreateNewBlog from './components/CreateNewBlog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from './reducers/blogReducer';
import { getAllUsers } from './reducers/userReducer';

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const userData = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Router>
        {userData.name ? (
          <>
            <Nav userData={userData} />
            <h2>blog app</h2>
            <Notification />
            <Routes>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/users/:id" element={<UserView />}></Route>
              <Route
                path="/"
                element={
                  <div>
                    <CreateNewBlog />
                    {blogs.map((blog) => (
                      <Blog key={blog.id} blog={blog} />
                    ))}
                  </div>
                }
              ></Route>
              <Route path="/blogs/:id" element={<BlogView />}></Route>
            </Routes>
          </>
        ) : (
          <LogIn />
        )}
      </Router>
    </>
  );
};

export default App;
