const { getAllUsers, createUserInDb } = require('../models/adminUsersModel.js');

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
    console.log('Fetched successfully');
  } catch (error) {
    console.error('Error fetching users from database:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function createUser(req, res) {
    const { username, email, password, number } = req.body;
  
    try {
      await createUserInDb(username, email, password, number);
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send({ message: 'Error creating user' });
    }
  }

module.exports = { getUsers, createUser };
