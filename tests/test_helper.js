const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test 2",
    author: "Test 2",
    url: "Test 2",
    likes: 2,
    id: "661c1247c6267f49349bccc0",
  },
  {
    title: "Test 2",
    author: "Test 2",
    url: "Test 2",
    likes: 2,
    id: "661c13210145d676deca8db9",
  },
  {
    title: "Test 2",
    author: "Test 2",
    url: "Test 2",
    likes: 2,
    id: "661c13220145d676deca8dbb",
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
