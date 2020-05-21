const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ')
  }))
let persons=[
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]
app.get('/api/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p> ${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id != id);
    res.status(204).end()
})
const generateId = () => {
    const maxId = Math.floor(Math.random() * Math.floor(100))
    return maxId
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(422).json({ 
          error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(422).json({ 
          error: 'number missing' 
        })
    }
    if(persons.some(person => person.name === body.name)){
        return response.status(409).json({ 
            error: 'name must be unique' 
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
    morgan.token('json', function (req, res) { return JSON.stringify(res.body)  })

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})