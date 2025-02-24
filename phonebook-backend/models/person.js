const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! It must be in the format XX-XXXXXXX or XXX-XXXXXXXX.`
    }
  }
});

module.exports = mongoose.model('Person', personSchema);
