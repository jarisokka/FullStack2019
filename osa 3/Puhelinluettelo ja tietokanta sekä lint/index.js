require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/mongoose')

const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const morgan = require('morgan')

morgan.token('tiny', (request) => { return JSON.stringify(request.body) })

app.use(morgan(' :method :url :res[content-length] - :response-time ms :tiny'))


const date = new Date()

app.get('/info', (request, response) => {
  Person.find(request.length)
    .then(persons => {
      response.send('<p>Phonebook has info for ' + persons.length + ' people</p>' + '<p>' + date + '</p>')
    })
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('annettu arvo ' + body.name + body.number)

  const person = new Person({    
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    console.log('added ' + savedPerson + ' to phonebook');
    response.json(savedPerson.toJSON())
  })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
    .catch(error => {
      console.log(error);
      response.status(404).end()
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status((404).end) 
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {    
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})