import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);
const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data);
const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const personsService = { getAll, create, remove };

export default personsService;
