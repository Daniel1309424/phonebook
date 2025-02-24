import React, { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ setPersons, persons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };

    personService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      <h2>Add a New Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={newName}
            onChange={handleNameChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="Number"
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PersonForm;
