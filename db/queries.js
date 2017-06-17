const knex = require('./knex');

module.exports = {
  getAll: function() {
    return knex('album')
    .select('*')
    .join('album_genre', 'album_genre.album_id', 'album.id')
  },
  getOne: function(order) {
    return knex('album').where('order', order).first();
  },
  create: function(album) {
    return knex('album').insert(album, '*');
  }
};
