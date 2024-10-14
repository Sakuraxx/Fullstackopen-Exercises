import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'cactus'
  };

  const { container } = render(<Blog blog={blog} />);
  const hideWhenVisible = container.querySelector('.hideWhenVisible');
  const showWhenVisible = container.querySelector('.showWhenVisible');
  expect(showWhenVisible).toHaveStyle('display: none;');
  expect(hideWhenVisible).toHaveTextContent(blog.title);
});

test('clicking the button to show the url and likes of the blog', async () => {
  const blog = {
    title: 'clicking the button',
    author: 'cactus',
    url: 'http://www.example.com',
    likes: 10
  };

  const { container } = render(<Blog blog={blog} />);
  const hideWhenVisible = container.querySelector('.hideWhenVisible');
  const showWhenVisible = container.querySelector('.showWhenVisible');

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(hideWhenVisible).toHaveStyle('display: none;');
  expect(showWhenVisible).toHaveTextContent(blog.title);
  expect(showWhenVisible).toHaveTextContent(blog.author);
  expect(showWhenVisible).toHaveTextContent(blog.url);
  expect(showWhenVisible).toHaveTextContent(blog.likes);
});

test('clicking the like button twice', async () => {
  const user = {
    id: 1,
  };

  const blog = {
    title: 'clicking the button',
    author: 'cactus',
    url: 'http://www.example.com',
    likes: 10,
    user: user
  };

  const mockUpdateHandler = vi.fn()
  render(<Blog blog={blog} update={mockUpdateHandler}/>);
  const userAgent = userEvent.setup();
  const viewBtn = screen.getByText('view');
  await userAgent.click(viewBtn);

  const likeBtn = screen.getByText('like');
  await userAgent.click(likeBtn);
  await userAgent.click(likeBtn);

  expect(mockUpdateHandler.mock.calls).toHaveLength(2);
});