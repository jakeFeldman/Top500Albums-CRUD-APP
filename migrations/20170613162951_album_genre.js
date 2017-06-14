
exports.up = function(knex, Promise) {
    return knex.schema.createTable('album_genre', (table) => {
      table.increments('id').primary();
      table.integer('genre_id').unsigned();
      table.foreign('genre_id').references('id').inTable('genre').onDelete('cascade');
      table.integer('album_id').unsigned();
      table.foreign('album_id').references('id').inTable('album').onDelete('cascade');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('album_genre');
};
