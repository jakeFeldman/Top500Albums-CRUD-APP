const knex = require('./knex');

module.exports = {
  getAll: function() {
    // return knex.select('*', 'album.id as album_id', 'genre.id as genre_id').from('album')
    // .join('album_genre', 'album_genre.album_id', 'album.id')
    // .join('genre', 'genre.id', 'album_genre.genre_id')
    return knex.select('album.rating', 'album.album', 'album.artist', 'album.id as album_id', 'genre.genre_name').from('album')
    .join('album_genre', 'album_genre.album_id', 'album.id')
    .join('genre', 'genre.id', 'album_genre.genre_id')
    // .limit(25)
  },
  getOne: function(rating) {
    return knex('album').where('rating', rating)
    .join('album_genre', 'album_genre.album_id', 'album.id')
    .join('genre', 'genre.id', 'album_genre.genre_id')
  },
  create: function(album) {
    return knex('album').insert(album, '*');
  }
};
