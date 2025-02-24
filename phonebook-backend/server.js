const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :body'));

app.use(express.static(path.join(__dirname, 'build')));

const personsRoutes = require('./api/persons');
const infoRoutes = require('./api/info');

app.use('/api/persons', personsRoutes);
app.use('/info', infoRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
