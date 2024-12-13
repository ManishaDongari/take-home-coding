import express from 'express';
import dotenv from 'dotenv';
import { getMovies } from './movies';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/movies/:year', async (req, res) => {
  const year = req.params.year;
  const page = parseInt(req.query.page as string) || 1;

  try {
    const movies = await getMovies(year, page);
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
