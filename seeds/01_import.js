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
      return Promise.all(
        Object.keys(albums).map(function(list) {
          let record = albums[list];
          console.log(record);
          return knex('album').insert({
            order: record.rating,



          })
        })
      )
    })
};





// return knex.raw('ALTER SEQUENCE genre_id_seq RESTART WITH 1').then( () => {
//   return Promise.join(
//     knex('genre').del(),
//
//     knex().insert({
//
//     });
//   );
// });
