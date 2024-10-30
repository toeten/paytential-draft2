/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("transaction_history", (table) => {
		table.increments("id");
		table.integer("simulation_id").references("id").inTable("simulations");
		table.integer("event_id").references("id").inTable("events");
		table.decimal("amount");
		table.string("category");
		table.string("description");
		table.string("month");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("transaction_history");
