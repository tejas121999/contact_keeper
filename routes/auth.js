const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');


// @route  GET api/auth
// @dese   GET logged in user
// @access Private 
router.get('/',
    //this is from middleware 
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    })

// @route  POST api/auth
// @dese   auth user get token 
// @access Public 
router.post('/', [
    check('email', 'please include valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    // validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;

    try {
        // check user is already existed
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'invalid credential' })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'invalid crediential' })
        }

        // jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000000
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})
module.exports = router;