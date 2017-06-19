const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
  queries.getAll()
  .then(albums => {
    const albumsWithGenres = [];
    const albumsByGenre = {};
    albums.forEach(album => {
      if (!albumsByGenre[album.album_id]) {
        const albumRecord = {
          id: album.album_id,
          rating: album.rating,
          album: album.album,
          artist: album.artist,
          year: album.year,
          artwork_url: album.artwork_url,
          genres: []
        }
        albumsWithGenres.push(albumRecord);
        albumsByGenre[album.album_id] = albumRecord;
      }
      (albumsByGenre[album.album_id].genres).push(album.genre_name);
    })
    res.json(albumsWithGenres);
  })
})

router.get('/:rating', (req, res) => {
  queries.getOne(req.params.rating)
  .then(albums => {
    const albumsWithGenres = [];
    const albumsByGenre = {};
    albums.forEach(album => {
      if (!albumsByGenre[album.album_id]) {
        const albumRecord = {
          id: album.album_id,
          rating: album.rating,
          album: album.album,
          artist: album.artist,
          year: album.year,
          artwork_url: album.artwork_url,
          genres: []
        }
        albumsWithGenres.push(albumRecord);
        albumsByGenre[album.album_id] = albumRecord;
      }
      (albumsByGenre[album.album_id].genres).push(album.genre_name);
    })
    res.json(albumsWithGenres);
  })
})

module.exports = router;
