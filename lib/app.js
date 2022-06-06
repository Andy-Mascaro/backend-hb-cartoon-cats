const express = require('express');
const { get } = require('express/lib/response');
const path = require('path');
const app = express();
const { cats } = require('../data/cats');

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes

// app.use('/cats', require('./controllers/cats'));
app.use('/cats/:id', (req, res) => {
  const { id } = req.params;
  const catInfo = cats.find((info) => info.id === id);
  res.json(catInfo);
});
app.use('/', (req, res) => {
  res.json(cats);
});

// Error handling & 404 middleware for when
// a request doesn't match any app routes

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
