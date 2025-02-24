const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({ name, number });

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
  Person.countDocuments()
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(error => next(error));
});

app.use((error, req, res, next) => {
  if (error.name === 'CastError') return res.status(400).json({ error: 'malformatted id' });
  if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
  next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
