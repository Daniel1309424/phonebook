import axios from 'axios';

const baseUrl = 'https://phonebook-five-theta.vercel.app/api/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);
const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data);
const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const personsService = { getAll, create, remove };

export default personsService;
