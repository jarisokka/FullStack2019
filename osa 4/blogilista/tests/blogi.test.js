const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  //let blogObject = new Blog(initialBlogs[0])
  //await blogObject.save()

  //blogObject = new Blog(initialBlogs[1])
 //await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(2)
})

test('there is id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})


test('the first blog title is about React patterns', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('React patterns')
})

test('a valid blog can can be added ', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(title).toContain('Type wars')
})

test('likes default 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  }

  await api.post('/api/blogs').send(newBlog)

  const response = await api.get('/api/blogs')

  expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('blog without content is not added', async () => {
  const newBlog = {}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('blog without url and title is not added', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body.length).toBe(
    initialBlogs.length - 1)

  const contents = blogsAtEnd.body.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})


afterAll(() => {
  mongoose.connection.close()
})
