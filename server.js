const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;

app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

const personsRoutes = require('./api/persons');
const infoRoutes = require('./api/info');

app.use('/api/persons', personsRoutes);
app.use('/info', infoRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
