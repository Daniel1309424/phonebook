const phonebookEntries = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
  ];
  
  export default (req, res) => {
    const { id } = req.query; 
    
    if (req.method === 'GET') {
      
      const person = phonebookEntries.find(p => p.id === id);
      
      if (person) {
        return res.status(200).json(person); 
      } else {
        return res.status(404).json({ error: 'Person not found' });
      }
    } else if (req.method === 'DELETE') {
     
      const index = phonebookEntries.findIndex(p => p.id === id);
      
      if (index !== -1) {
        phonebookEntries.splice(index, 1); 
        return res.status(204).end(); 
      } else {
        return res.status(404).json({ error: 'Person not found' });
      }
    }
  };
  