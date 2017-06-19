const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidRating(req, res, next) {
  if (!isNaN(req.params.rating)) return next();
  next(new Error('Album does not exist'));
}

function isValidAlbum(album) {
  const hasRating = !isNaN(album.rating);
  const hasAlbum = typeof album.album == "string" && album.album.trim() != '';
  const hasArtist = typeof album.artist == "string" && album.artist.trim() != '';
  const hasYear = !isNaN(album.rating);
  const hasImageUrl = typeof album.artwork_url == "string" && album.artwork_url.trim() != '';
  const hasGenre = Array.isArray(album.genre);
  return hasRating && hasAlbum && hasArtist && hasYear && hasImageUrl && hasGenre;
}

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

router.get('/:rating', isValidRating, (req, res) => {
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

// router.post('/', (req, res, next) => {
//   if (isValidAlbum(req.body)) {
//     queries.postAlbum(req.body)
//       .then(album => {
//         res.json(album[0]);
//       });
//   } else {
//     next(new Error("Invalid Album"))
//   }
// });
//
//
// router.put('/:rating', isValidRating, (req, res) => {
//   queries.updateAlbum()
//     .then(album => {
//
//     })
// })

router.delete('/:rating', isValidRating, (req, res) => {
  queries.deleteAlbum(req.params.rating).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
