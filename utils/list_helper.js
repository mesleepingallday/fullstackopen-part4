const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  const result = blogs.reduce(reducer, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => {
    return max.likes > item.likes ? max : item;
  };
  const result = blogs.reduce(reducer, blogs[0]);
  return result;
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author");
  const mostBlogsAuthor = _.maxBy(_.keys(authors), (author) => authors[author]);
  return {
    author: mostBlogsAuthor,
    blogs: authors[mostBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const likes = _.mapValues(authors, (blogs) => totalLikes(blogs));
  const mostLikesAuthor = _.maxBy(_.keys(likes), (author) => likes[author]);
  return {
    author: mostLikesAuthor,
    likes: authors[mostLikesAuthor].reduce((sum, item) => sum + item.likes, 0),
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
