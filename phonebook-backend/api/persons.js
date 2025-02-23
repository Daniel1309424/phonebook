const phonebookEntries = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
  ];
  
  module.exports = (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json(phonebookEntries); 
    } else if (req.method === 'POST') {
      const { name, number } = req.body;
  

      if (!name || !number) {
        return res.status(400).json({ error: 'name or number is missing' });
      }
  
      const personExists = phonebookEntries.some(p => p.name === name);
      if (personExists) {
        return res.status(400).json({ error: 'name must be unique' });
      }
  
      const newId = (Math.floor(Math.random() * 500) + 1).toString();
      const newPerson = { id: newId, name, number };
  
      phonebookEntries.push(newPerson);
      res.status(201).json(newPerson);
    }
  };
  