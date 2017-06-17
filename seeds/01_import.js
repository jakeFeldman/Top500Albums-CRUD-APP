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
      // create and empty array to store all the genres.
      let allGenresWithDuplicates = [];
      // Loop through the albums object and access each genre
      albums.forEach((record_info) => {
        const allGenres = record_info.genre;
        // Loop through all genres and push all genres to an empty array.
        // This will return duplicates
        for (let i = 0; i < allGenres.length; i++) {
          allGenresWithDuplicates.push(allGenres[i]);
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

      // Loop through genreArray and push each genre to an individual object to insert into the
      for (let i = 0; i < genreArray.length; i++) {
        genreArray[i] = {
          "genre-name": genreArray[i]
        };
      }
      // Insert all genres into the genre table
      return knex('genre').insert(genreArray);
    })
    // Promise
    .then(() => {
      return Promise.all(
        // Map/Iterate through the albums and set the data object
        albums.map((record) => {
          let album_table = {
            order: record.rating,
            album: record.album,
            artist: record.artist,
            year: record.year
          }
          // Insert Album into album table, callback 'id' (album.id)
          return knex('album').insert(album_table, 'id')
            // With ID as the callback, assign it to ablum_id (Used for storing and placing into the join table).
            .then((albumIDs) => {
              // Specify which index value 0;
              const album_id = albumIDs[0];
              // Lookup in genre table where "genre-name"
              return knex('genre').whereIn("genre-name", record.genre).pluck('genre.id')
                .then((genreIDs) => {
                  const album_genre_ID = genreIDs.map((genre_id) => {
                    return {
                      album_id,
                      genre_id
                    }
                  });
                  // Insert album_id and genre_id into the join table
                  return knex('album_genre').insert(album_genre_ID);
                });
            });
        })
      );
    });
};
