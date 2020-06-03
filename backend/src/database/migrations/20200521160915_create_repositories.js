exports.up = function(knex) {
  return knex.schema.createTable('repositories', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('url').notNullable();
    table.text('techs').notNullable();
    table.integer('likes').notNullable();
    table.string('user_avatar_url');
    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('user_avatar_url').references('avatar_url').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('repositories');
};
