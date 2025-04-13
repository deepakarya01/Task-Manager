const express = require('express')
const router = express.Router();
const {protected} = require('../middleware/authMIddleware')

const {register, login} = require('../controllers/userController')

router.post('/register', register);

router.post('/login', login);

router.get('/me', protected, (req, res) => {
   res.json({ message: "Registered user!", user: req.user });
});

module.exports = router;

