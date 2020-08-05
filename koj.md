exports.up = function (knex) {
  //console.log('creating topic table')
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string("slug").primary().notNullable();
    topicsTable.text("description").notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("topics")
};

exports.up = function (knex) {

  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string("username").primary().notNullable();
    usersTable.string("avatar_url")
    usersTable.string("name").notNullable()
  })

};

exports.down = function (knex) {
  return knex.schema.dropTable("users")
};

exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTables) => {
    articlesTables.increments("article_id").primary().notNullable();
    articlesTables.string("title").notNullable();
    articlesTables.text("body").notNullable();
    articlesTables.integer("votes").defaultTo(0);
    articlesTables.string("topic").notNullable().references("topic_slug");
    articlesTables.string("author").notNullable().references("user.username");
    articlesTables.string("created_at").references(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles")
};
