import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateNewBlog from './CreateNewBlog';

describe('<CreateNewBlog />', () => {
  const addBlog = jest.fn();
  const cancelAddBlog = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <CreateNewBlog addBlog={addBlog} cancelAddBlog={cancelAddBlog} />
    );
  });

  test('ensures submit form clicking event', () => {
    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    fireEvent.change(title, {
      target: { value: 'Wonderful Story' },
    });
    fireEvent.change(author, {
      target: { value: 'Adam Tyrell' },
    });
    fireEvent.change(url, {
      target: { value: 'http://wonderful.com/article/2536' },
    });
    fireEvent.submit(form);
    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe('Wonderful Story');
    expect(addBlog.mock.calls[0][0].author).toBe('Adam Tyrell');
    expect(addBlog.mock.calls[0][0].url).toBe(
      'http://wonderful.com/article/2536'
    );
  });
});
