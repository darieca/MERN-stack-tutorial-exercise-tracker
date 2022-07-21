const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find() // find returns a promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error from user main: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username; // grab username from server.js
    const newUser = new User({username}); // username is variable field

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error from user add: ' + err))
})

module.exports = router
