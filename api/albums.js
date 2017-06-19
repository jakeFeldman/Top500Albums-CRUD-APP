const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
  queries.getAll().then( albums => {
    const albumsWithGenres = [];
    const albumsByGenre = {};

    albums.forEach( album => {
    //   console.log(albumsByGenre[albums.genre_name]);
    //   if(!albumsByGenre[albums.genre_name]) {
    //     const album = {
    //       id: albums.id,
    //       album: albums.album,
    //       artist: albums.artist,
    //       year: albums.year,
    //       genres: []
    //     }
    //     albumsWithGenres.push(album);
    //     albumsByGenre[albums.genre_name] = albums;
    //   }
    //
    //   [album.genres].push(albums.genre);
    //
    })
    res.json(albums);
  })
})

router.get('/:order', (req, res) => {
  queries.getOne(req.params.order).then( album => {
    res.json(album)
  })
})

module.exports = router;
