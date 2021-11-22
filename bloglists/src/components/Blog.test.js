import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    id: '1',
    title: 'Wonderful Story',
    url: 'http://wonderful.com/article/2536',
    author: 'Adam Tyrell',
    likes: 5,
    user: {
      name: 'Steve McLarof',
      username: 'steviemc',
    },
  };
  const userData = {
    name: 'Steve McLarof',
    username: 'steviemc',
    token: '',
  };
  const mockHandler = jest.fn();

  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateLike={mockHandler}
        deleteBlog={mockHandler}
        user={userData}
      />
    );
  });

  test('renders title and author as default', () => {
    expect(component.container).toHaveTextContent(
      'Wonderful Story Adam Tyrell'
    );
    expect(component.container).not.toHaveTextContent(
      'http://wonderful.com/article/2536'
    );
    expect(component.container).not.toHaveTextContent('likes 5');
  });

  test('renders details after clicking view', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent(
      'Wonderful Story Adam Tyrell'
    );
    expect(component.container).toHaveTextContent(
      'http://wonderful.com/article/2536'
    );
    expect(component.container).toHaveTextContent('likes 5');
    expect(component.container).toHaveTextContent('hide');
  });

  test('ensures clicking like button twice', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    expect(component.container).toHaveTextContent('hide');
    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
