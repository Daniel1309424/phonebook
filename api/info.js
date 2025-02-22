module.exports = (req, res) => {
    const currentTime = new Date().toString();
    const phonebookCount = 4;
    res.send(`
      <p>Phonebook has info for ${phonebookCount} people</p>
      <p>${currentTime}</p>
    `);
  };
  