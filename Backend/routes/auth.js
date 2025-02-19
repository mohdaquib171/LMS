// routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      password,
      name
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Admin Login
router.post('/adminlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Admin credentials verification (you can store these in env variables)
    if (username === 'admin' && password === 'LMS-Admin123') {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '10d' }
      );
      return res.json({ token });
    }

    res.status(401).json({ msg: 'Invalid admin credentials' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;