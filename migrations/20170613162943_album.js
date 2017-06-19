
exports.up = function(knex, Promise) {
  return knex.schema.createTable('album', (table) => {
    table.increments('id').primary();
    table.text('rating').notNull();
    table.text('album').notNull();
    table.text('artist').notNull();
    table.text('year').notNull();
    table.text('artwork_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('album');
};
