const knex = require('./knex');

module.exports = {
  getAll: function() {
    return knex.select('*').from('album')
      .join('album_genre', 'album_genre.album_id', 'album.id')
      .join('genre', 'genre.id', 'album_genre.genre_id')
  },
  getOne: function(rating) {
    return knex.select('*', 'album.id as album_id', 'genre.genre_name')
      .from('album').where('rating', rating)
      .join('album_genre', 'album_genre.album_id', 'album.id')
      .join('genre', 'genre.id', 'album_genre.genre_id')
  },
  postAlbum: function(album) {
    const {
      rating,
      album: album_name,
      artist,
      year,
      artwork_url
    } = album;

    return knex('album').insert({
      rating,
      album: album_name,
      artist,
      year,
      artwork_url
    }, '*').then(results => {
      const createdAlbum = results[0];
      const album_id = createdAlbum.id;

      return knex('genre')
        .whereIn('genre_name', album.genres)
        .pluck('id')
        .then(genreIds => {
          const album_genres = genreIds.map(genre_id => {
            return {
              album_id,
              genre_id
            }
          });

          return knex('album_genre')
            .insert(album_genres)
            .then(() => {
              createdAlbum.genres = album.genres;
              return createdAlbum;
            });
        });
    });
  },
  deleteAlbum: function(rating) {
    return knex.select('*').from('album').where('rating', rating).del();
  }
};

// order by rating
