const express = require('express');
const app = express();
const port = 3100;

let idSeq = 4;

//Middleware data
app.use(express.json());

//Untuk menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

//Array movies
let movies = [
    {id: 1, title: 'The Shawshank Redemption', year: 1994},
    {id: 2, title: 'The Godfather', year: 1972},
    {id: 3, title: 'The Dark Knight', year: 2008},
];

//Jika membuka localhost:3100 akan menampilkan pesan berikut
app.get('/', (req, res) => {
    res.send('Selamat datang di API Movies');
});

//GET /movies untuk menampilkan semua data film
app.get('/movies', (req, res) => {
    res.json(movies);
});

//GET /movies/:id untuk menampilkan data film berdasarkan id
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
         res.status(404).json({error: 'Movie not found'});
    }
});

// POST /movies - Menambahkan film baru
app.post('/movies', (req, res) => {
    const { title, director, year } = req.body || {};
    if (!title || !director || !year) {
        return res.status(400).json({ error: 'title, director, dan year wajib diisi' });
    }
    const newMovie = { id: ++idSeq, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT /movies/:id - Memperbarui data film
app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie tidak ditemukan' });
    }
    const { title, director, year } = req.body || {};
    const updatedMovie = { id, title, director, year };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});
// DELETE /movies/:id - Menghapus film
app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie tidak ditemukan' });
    }
    movies.splice(movieIndex, 1);
    res.status(204).send();
});

//Array directors   
let directors = [
    {id: 1, name: 'Frank Darabont', birthYear: 1959},
    {id: 2, name: 'Francis Ford Coppola', birthYear: 1939},
    {id: 3, name: 'Christopher Nolan', birthYear: 1970},
];

//GET untuk melihat data directors
app.get('/directors', (req, res) => {
    res.json(directors);
});

//GET melihat data directors berdasarkan id
app.get('/directors/:id', (req, res) => {
    const director = directors.find(d => d.id === parseInt(req.params.id));
    if (director) {
        res.json(director);
    } else {
         res.status(404).json({error: 'Director not found'});
    }
});

//POST menambahkan directors baru
app.post('/directors', (req, res) => {
    const { name, birthYear } = req.body || {};
    if (!name || !birthYear) {
        return res.status(400).json({ error: 'name dan birthYear wajib diisi' });
    }
    const newDirector = { id: ++idSeq, name, birthYear };
    directors.push(newDirector);
    res.status(201).json(newDirector);
});

//PUT memperbarui directors
app.put('/directors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const directorIndex = directors.findIndex(d => d.id === id);
    if (directorIndex === -1) {
        return res.status(404).json({ error: 'Director tidak ditemukan' });
    }
    const { name, birthYear } = req.body || {};
    const updatedDirector = { id, name, birthYear };
    directors[directorIndex] = updatedDirector;
    res.json(updatedDirector);
});

//DELETE menghapus directors
app.delete('/directors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const directorIndex = directors.findIndex(d => d.id === id);
    if (directorIndex === -1) {
        return res.status(404).json({ error: 'Director tidak ditemukan' });
    }
    directors.splice(directorIndex, 1);
    res.status(204).send();
});