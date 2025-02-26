require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

// Middleware
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndPoint = (request,response) => {
  response.status(404).send({error: 'uknown'})
}

app.get('/api/persons', (req,res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id',(req,res, next) => {
  const id = req.params.id
  Person.findById(id).then(p => {
    if (p) {
      res.json(p)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.get('/info', (req,res) => {

  res.send('<p>Phone book has info for  people </p>\n<p></p>')
})

app.delete('/api/persons/:id',(req,res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error))
})

app.post('/api/persons/',(req,res,next) => {
  let person_param = req.body
  const person = new Person({
    name: person_param.name,
    number: person_param.number
  })
  const options = { runValidators: true}
  person.save(options).then(() => {
    res.json({content: 'added'})
  }).catch(err => {
    next(err)
  })
})

app.put('/api/persons/:id',(request, response, next) => {
  const id  = request.params.id
  const person = {
    name: request.body.name,
    number: request.body.number
  }
  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updated => {
      response.json(updated)
    }).catch(error => next(error))
})

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`LIVE ON ${PORT}`)
})