const router = require('express').Router();
const User = require('../../models/User');


// Login - /api/users/login
router.post('/login', async (req, res) => {

})


// CREATE new user - /api/users/signup

router.post('/signup', async (req, res) => {
    try {
        // const userData = await User.create(req.body);
        const newUser = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(200).json(newUser);

    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;