const mongoose = require('mongoose');
const Person = require('./models/person'); 

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    if (name && number) {
      
      const person = new Person({
        name,
        number
      });

      person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    } else {
      Person.find({}).then(persons => {
        console.log('phonebook:');
        persons.forEach(person => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
  })
  .catch(error => console.log(error));
