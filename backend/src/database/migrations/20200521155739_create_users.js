exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.string('id').primary();
    table.string('username').notNullable();
    table.string('github_username').notNullable();
    table.string('avatar_url');
    table.string('password_hash').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
