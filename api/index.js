const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

const phonebookEntries = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/api/persons', (req, res) => {
  res.json(phonebookEntries);
});

app.get('/info', (req, res) => {
  const currentTime = new Date().toString();
  const phonebookCount = phonebookEntries.length;
  res.send(`
    <p>Phonebook has info for ${phonebookCount} people</p>
    <p>${currentTime}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebookEntries.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: 'name or number is missing' });
  }

  const personExists = phonebookEntries.some(p => p.name === name);
  if (personExists) {
    return res.status(400).send({ error: 'name must be unique' });
  }

  const newId = (Math.floor(Math.random() * 500) + 1).toString();
  const newPerson = { id: newId, name, number };

  phonebookEntries.push(newPerson);
  res.status(201).json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = phonebookEntries.findIndex(p => p.id === id);
  if (index !== -1) {
    phonebookEntries.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

module.exports = app;
