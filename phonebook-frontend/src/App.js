import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setError('Failed to fetch phonebook data');
      });
  }, []);

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        setError('Failed to delete person');
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonForm persons={persons} setPersons={setPersons} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <PersonList persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
