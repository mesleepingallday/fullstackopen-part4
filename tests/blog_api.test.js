const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const assert = require("assert");
const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//4.8
describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogPosts = response.body;
    assert.deepStrictEqual(blogPosts, helper.initialBlogs);
  });
});

//4.9
test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogPosts = response.body;

  blogPosts.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(typeof blog.id, "string");
    assert.strictEqual(blog._id, undefined);
  });
});

//4.10
describe("POST /api/blogs", async () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "New Blog Test",
      author: "Author",
      url: "https://www.example.com",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(titles.includes("New Blog Test"));
  });

  //4.11
  test("create a blog without likes property", async () => {
    const newBlog = {
      title: "New Blog Test Without Likes",
      author: "Author",
      url: "https://www.example.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.find(
      (blog) => blog.title === "New Blog Test Without Likes"
    );
    assert.strictEqual(blog.likes, 0);
  });

  test("create a blog without title and url", async () => {
    const newBlog = {
      author: "Author",
      likes: 3,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
