const express = require('express')
const app = express()
app.use(express.json())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
    const person = persons.find((p) => p.id === req.params.id)
    if (person) {
        res.status(200).json(person)
    } else {
        res.status(404).json({error: "Notfound"})
    }
})

app.get('/info', (req,res) => {
    const len = persons.length
    const time = new Date()
    res.send(`<p>Phone book has info for ${len} people </p>\n<p>${time}</p>`)
})

app.delete('/api/persons/:id',(req,res) => {
    const id = req.params.id
    persons = persons.filter((p) => p.id !== id)
    res.status(204).json(persons)
    console.log(persons)
})

app.post('/api/persons/',(req,res) => {
    let person = req.body
    if (persons.find(p => p.name === person.name)) {
       res.status(404).json({error: "name must be unique"}) 
    }
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0
    console.log(req.body)
    
    person.id = String(maxId + 1)

    persons = persons.concat(person)

    res.json(persons)
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`LIVE ON ${PORT}`)
})