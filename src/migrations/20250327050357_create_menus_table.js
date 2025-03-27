/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('menus', function (table) {
        table.bigIncrements('id').primary();
        table.string('name', 255).notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.text('description');
        table.enu('menu_type', ['Meals', 'Snacks', 'Drinks']).notNullable();
        table.enu('status', ['available', 'unavailable']).notNullable().defaultTo('available');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('menus');
};
