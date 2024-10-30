const Profile = require('../models/Profile');

const profileController = {
  async createProfile(req, res) {
    try {
      const { is_admin, organization } = req.body; 
      const user_id = req.session.userId; // Using userId from the session

      if (!user_id) {
        return res.status(401).json({ message: "User not authenticated." });
      }

      // Create a new profile entry
      const profile = await Profile.create(user_id, is_admin, organization);

      res.status(201).json(profile); // Return the created profile as a response
    } catch (error) {
      res.status(500).json({ message: `Error creating profile: ${error.message}` });
    }
  },
};

module.exports = profileController;
