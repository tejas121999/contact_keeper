const express = require('express')
const router = express.Router();

// @route  GET api/contacts
// @desc   GET all users contact 
// @access Private 
router.get('/', (req, res) => {
    res.send('get all contact');
})

// @route  ADD api/contacts
// @desc   Add new contact  
// @access Private 
router.post('/', (req, res) => {
    res.send('ADD contact');
})

// @route  PUT api/contact/:id
// @desc   Update contact 
// @access Private
router.put('/:id', (req, res) => {
    res.send('contact update ');
})

// @route  PUT api/contact/:id
// @desc   Update contact 
// @access Private
router.delete('/:id', (req, res) => {
    res.send('contact delete ');
})

module.exports = router;