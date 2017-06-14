
exports.up = function(knex, Promise) {
  return knex.schema.createTable('album', (table) => {
    table.increments('id').primary();
    table.text('order').notNull();
    table.text('album').notNull();
    table.text('artist').notNull();
    table.text('year').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('album');
};
