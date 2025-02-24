import React from 'react';

const PersonList = ({ persons, handleDelete }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
