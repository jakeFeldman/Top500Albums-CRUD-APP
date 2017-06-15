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
        knex.raw('TRUNCATE album_genre RESTART IDENTITY CASCADE;'),
        knex.raw('TRUNCATE album RESTART IDENTITY CASCADE;'),
        knex.raw('TRUNCATE genre RESTART IDENTITY CASCADE;'),
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
      return Promise.all(
        albums.map((record) => {
          let albumInfo = {
            order: record.rating,
            album: record.album,
            artist: record.artist,
            year: record.year
          }
          // console.log(albumInfo);
          return knex('album').insert(albumInfo, 'id')
          .then((result) => {
            let album_id = result[0];
            // console.log(album_id);
            return knex('genre').whereIn("genre-name", record.genre).pluck('genre.id')
            .then((genreIDs)=>{
              // console.log(genreIDs);
                const IDS = genreIDs.map((genre_id)=>{
                  return {
                    album_id,
                    genre_id
                  }
                });
                return knex('album_genre').insert(IDS);
            });
          });
        });
      );
    });
};
