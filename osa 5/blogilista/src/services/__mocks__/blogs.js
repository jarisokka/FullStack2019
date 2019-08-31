const blogs = [
 {
    likes: 13,
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: {
       username: "mluukkai",
       name: "Matti Luukkainen",
       id: "5d5d7b055407af2244aa6b02"
       },
       id: "5d5e6df4640b8147c4607c7a"
    },
    {
    likes: 0,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5d5d7b055407af2244aa6b02"
      },
      id: "5d65280c74210a3cf8f6d98a"
    },
    {
    likes: 7,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5d5d7b055407af2244aa6b02"
      },
      id: "5d65283874210a3cf8f6d98b"
    },
    {
    likes: 0,
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5d5d7b055407af2244aa6b02"
      },
      id: "5d65285674210a3cf8f6d98c"
    }
  ]
  
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    return Promise.resolve(blogs)
  }
  
  export default { getAll, setToken }