/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("simulations", (table) => {
		table.increments("id");
		table.integer("user_id").references("id").inTable("users");
		table.string("current_month");
		table.decimal("net_worth");
		table.boolean("is_complete").defaultTo(false);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("simulations");
