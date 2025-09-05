const express = require('express');
const app = express();
const port = 3100;

//middleware data
app.use(express.json());


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

//dummydata
let movies = [
    {id: 1, title: 'The Shawshank Redemption', year: 1994},
    {id: 2, title: 'The Godfather', year: 1972},
    {id: 3, title: 'The Dark Knight', year: 2008},
];

app.get('/', (req, res) => {
    res.send('Selamat datang di API Movies');
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET /movies - Melihat data film
app.get('/movies', (req,res) =>{
    res.json(movies);
});

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