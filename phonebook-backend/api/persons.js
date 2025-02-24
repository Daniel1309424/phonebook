const express = require('express');
const router = express.Router();
const { Person } = require('../mongo'); 

router.get('/', async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });

  try {
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndRemove(req.params.id);
    if (person) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
