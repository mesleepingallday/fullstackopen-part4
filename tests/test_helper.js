const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test",
    author: "Test",
    url: "Test",
    likes: 0,
    id: "661a978d5129ca2ff73ef40a",
  },
  {
    title: "Test",
    author: "Test",
    url: "Test",
    likes: 0,
    id: "661bcfb331e381dce418d77a",
  },
  {
    title: "Test 2",
    author: "Test 2",
    url: "Test 2",
    likes: 2,
    id: "661bd04431e381dce418d77c",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
