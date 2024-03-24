const dummy = (blogs) => {
  // ...
  return 1;
};
const totalLikes = (blogs) => {
  // ...
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  // ...
  const mostLikedBlog = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  );
  const { title, author, likes } = mostLikedBlog;
  return { title, author, likes };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
