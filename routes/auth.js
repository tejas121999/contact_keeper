const express = require('express')
const router = express.Router();

// @route  GET api/auth
// @dese   GET logged in user
// @access Private 
router.get('/', (req, res) => {
    res.send('get logged in user');
})

// @route  POST api/auth
// @dese   auth user get token 
// @access Public 
router.get('/', (req, res) => {
    res.send('logg in user');
})
module.exports = router;