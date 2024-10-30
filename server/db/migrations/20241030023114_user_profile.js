/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("user_profile", (table) => {
		table.integer("user_id").primary().references("id").inTable("users");
		table.string("organization");
		table.boolean("is_admin").defaultTo(false);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("user_profile");
