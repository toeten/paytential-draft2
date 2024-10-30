const knex = require('../db/knex');

class Profile {
  constructor({ user_id, is_admin, organization }) {
    this.user_id = user_id;
    this.is_admin = is_admin;
    this.organization = organization;
  }
    // Creates a new profile in the user_profile table
    static async create(user_id, is_admin, organization) {
      const query = `
        INSERT INTO user_profile (user_id, is_admin, organization)
        VALUES (?, ?, ?) RETURNING *
      `;
      const result = await knex.raw(query, [user_id, is_admin, organization]);
      const rawProfileData = result.rows[0];
      return new Profile(rawProfileData);
    }
  }

  module.exports = Profile;