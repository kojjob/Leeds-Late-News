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