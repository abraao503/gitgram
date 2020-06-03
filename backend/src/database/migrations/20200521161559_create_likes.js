exports.up = function(knex) {
  return knex.schema.createTable('likes', function(table) {
    table.increments();
    table.integer('repository_id').notNullable();
    table.string('user_id').notNullable();
    table.foreign('repository_id').references('id').inTable('repositories').onDelete('CASCADE');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('likes');
};
