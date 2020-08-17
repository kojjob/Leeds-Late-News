exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTables) => {
    articlesTables.increments("article_id").primary();
    articlesTables.string("title").notNullable();
    articlesTables.text("body").notNullable();
    articlesTables.integer("votes").defaultTo(0);
    articlesTables.string("topic").references("topics.slug").notNullable();
    articlesTables.string("author").references("users.username").notNullable();
    articlesTables.string("created_at").defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles")
};