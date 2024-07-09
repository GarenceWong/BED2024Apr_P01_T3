const User = require('../models/user');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await User.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const message = await User.updateUser(req.params.id, req.body);
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const message = await User.deleteUser(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  searchUsers: async (req, res) => {
    const searchTerm = req.query.searchTerm;

    console.log('Search term:', searchTerm); // Log the search term

    try {
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching users' });
    }
  }
};






