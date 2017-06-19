
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genre', (table) => {
    table.increments('id').primary();
    table.text('genre_name').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('genre');
};
