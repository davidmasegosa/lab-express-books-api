const express = require('express');
 
const app = express();
const PORT = 8000;

const books = require('./books.json');
 
app.use(express.json());
 
// Rutas aquí
 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});