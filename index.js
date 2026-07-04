const express = require('express');
const Joi = require('joi');
 
const app = express();
const PORT = 8000;

const books = require('./books.json');
 
app.use(express.json());
 
// Rutas aquí
 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));

    if(book) {
      res.json(book);
    } else {
      res.status(404).json({ code: 'not_found' });
    }
});

app.get('/api/books', (req, res) => {

  let filteredBooks = [];

  if(req.query.genre) {
    filteredBooks = books.filter(book => book.genre === req.query.genre);
  } else {
    filteredBooks = books;
  }

  if(req.query.sort && req.query.sort === 'year') {
    filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
  }

  res.json(filteredBooks);
});

app.post('/api/books', (req, res) => {
  const { title, author, genre, year } = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    year: Joi.number().integer().required()
  });

  const { error } = schema.validate({ title, author, genre, year });

  if(error) {
    return res.status(400).json({ code: 'bad_request', message: 'validation error' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    year
  };

  books.push(newBook);
  res.status(201).json(newBook);
});