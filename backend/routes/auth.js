const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  newUser.save((err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.sendStatus(200);
  });
});

// Аутентификация пользователя
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;