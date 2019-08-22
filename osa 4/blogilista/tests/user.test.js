const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'Test1',
    name: 'Joku',
    password: 'sekret',
  },
  {
    username: 'Test2',
    name: 'Toinen',
    password: 'sekret',
  }
]

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
    //const user = new User({ username: 'root', password: 'sekret' })
    //await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')
    console.log('alkuperäisen sisältö' + JSON.stringify(usersAtStart.body))
    
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await api.get('/api/users')

    expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)
    
    const usernames = usersAtEnd.body.map(u => u.username)

    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'Test1',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('`username` to be unique')

  const usersAtEnd = await api.get('/api/users')
  expect(usersAtEnd.body.length).toBe(usersAtStart.body.length)
})


afterAll(() => {
  mongoose.connection.close()
})