'use strict'

const albums = require('./album_genre.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('album_genre').del()
    .then(() => {
      return knex('album').del();
    })
    .then(() => {
      return knex('genre').del();
    })
    .then(() => {
      return Promise.all([
        knex.raw('ALTER SEQUENCE album_genre_id_seq RESTART WITH 1;'),
        knex.raw('ALTER SEQUENCE album_id_seq RESTART WITH 1;'),
        knex.raw('ALTER SEQUENCE genre_id_seq RESTART WITH 1;'),
      ]);
    })
    .then(() => {
      let allGenresWithDuplicates = [];
      albums.forEach((genreKey) => {
        const GENRE = genreKey.genre;
        // Loop through all genres and push all genres to an empty array.
        // This will return duplicates
        for (let i = 0; i < GENRE.length; i++) {
          allGenresWithDuplicates.push(GENRE[i]);
        }
      })
      // Use reduce to get rid of all duplicates and push them into an array.
      let genreArray = allGenresWithDuplicates.reduce((allGenres, individualGenre) => {
        if (!allGenres.includes(individualGenre)) {
          allGenres.push(individualGenre);
        }
        return allGenres;
      }, [])

      // Sort the array so all genres are inserted alphabetically
      genreArray = genreArray.sort();
      for (let i = 0; i < genreArray.length; i++) {
        genreArray[i] = {
          "genre-name": genreArray[i]
        };
      }
      // console.log(genreArray);
      return knex('genre').insert(genreArray);
    })
    .then(() => {
        albums.forEach((record) => {
          let albumInfo = {
            order: record.rating,
            album: record.album,
            artist: record.artist,
            year: record.year
          }
          console.log(albumInfo);
          return knex('album').insert(albumInfo);
        })
    })
};
