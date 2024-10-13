import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'cactus'
  };

  const {container} = render(<Blog blog={blog} />);
  const hideWhenVisible = container.querySelector('.hideWhenVisible');
  const showWhenVisible = container.querySelector('.showWhenVisible');
  expect(showWhenVisible).toHaveStyle('display: none;');
  expect(hideWhenVisible).toHaveTextContent(blog.title);
})