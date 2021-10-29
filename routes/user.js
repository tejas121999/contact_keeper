const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')


//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/',
    // validation check
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check('password', 'please enter a password with 6 or more character').isLength({ min: 6 })
    ],
    async (req, res) => {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {
            // check email is already exest or not
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ msg: 'user already exested' })
            }

            user = new User({
                name,
                email,
                password
            });
            // hashing password 
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            // res.send('user save')
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
            res.send(500).send('server Error')
        }
    })

module.exports = router;