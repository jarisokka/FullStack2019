const _ = require('lodash');

const dummy = (blogs) => {
  return blogs
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((x, blog) => x + blog.likes, 0) 
  return (likes)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => parseInt(blog.likes)) 
  const highest = Math.max(...likes)
  return blogs.find(blog => blog.likes === highest)
}

const mostBlogs = (blogs) => {
  const author = _.countBy(blogs, 'author', Math.floor)
  const keys = _.keys(author)
  const last = _.last(keys)
  const value = _.values(author)
  const lastval = _.last(value)
  //console.log('testi ' + JSON.stringify(author))
  //console.log('testi2 ' + keys)
  return result = { author: last, blogs: lastval }
}

const mostLikes = (blogs) => {
  let count = []
  
  for (const blog of blogs) {
    const blogsAuthor = { author: blog.author, likes: 0 }
    if (!count.find(x => x.author === blogsAuthor.author)) {
      count.push(blogsAuthor)
    }

    for (const blog of blogs) {
      if (blog.author === blogsAuthor.author) {
        blogsAuthor.likes += blog.likes
      }
    }
  }

  return count.reduce(
    (max, cur) => (max.likes > cur.likes ? max : cur),
    count[0]
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}