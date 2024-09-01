const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return [];

  let maxLikes = blogs[0].likes;
  let blogsWithMostLikes = [blogs[0]];

  for (let i = 1; i < blogs.length; i++) {
    const currentBlog = blogs[i];
    if (currentBlog.likes > maxLikes) {
      maxLikes = currentBlog.likes;
      blogsWithMostLikes = [currentBlog];
    } else if (currentBlog.likes === maxLikes) {
      blogsWithMostLikes.push(currentBlog);
    }
  }

  return blogsWithMostLikes;
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");
  const topAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
