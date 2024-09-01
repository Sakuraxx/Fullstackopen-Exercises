const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const _ = require("lodash");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f4",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 1,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 10,
      __v: 2,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has many blogs, equals the likes of", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 17);
  });

  test("when list has no blogs, equals the likes of 0", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("blogs with most likes", () => {
  test("blogs with one blog", () => {
    const onlyOneBlogWithMostLikes = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(onlyOneBlogWithMostLikes);
    assert.deepStrictEqual(onlyOneBlogWithMostLikes, result);
  });

  test("only one blogs has the most likes in blogs", () => {
    const onlyOneBlogWithMostLikes = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f5",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(onlyOneBlogWithMostLikes);
    assert.deepStrictEqual([onlyOneBlogWithMostLikes[1]], result);
  });

  test("two blogs have the most likes in blogs", () => {
    const blogsWithMostLikes = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f5",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogsWithMostLikes);
    assert.deepStrictEqual(blogsWithMostLikes, result);
  });
});

describe("author with the most blogs", () => {
  test("only one author has the most blogs", () => {
    const onlyOneAuthorHasMostBolgs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
      },
      {
        title: "Go To Hell",
        author: "Edsger W. Dijkstra",
      },
      {
        title: "Where can we go",
        author: "MM",
      },
    ];

    const result = listHelper.mostBlogs(onlyOneAuthorHasMostBolgs);
    assert.deepStrictEqual({ author: "Edsger W. Dijkstra", blogs: 2 }, result);
  });

  test("more than one author have the most blogs", () => {
    const moreThanOneAuthorHaveMostBolgs = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
      },
      {
        title: "Where can we go",
        author: "MM",
      },
    ];

    const result = listHelper.mostBlogs(moreThanOneAuthorHaveMostBolgs);
    const actualRes = [
      { author: "Edsger W. Dijkstra", blogs: 1 },
      { author: "MM", blogs: 1 },
    ];
    const exists = _.some(actualRes, _.isEqual.bind(null, result));
    assert.strictEqual(true, exists);
  });
});
