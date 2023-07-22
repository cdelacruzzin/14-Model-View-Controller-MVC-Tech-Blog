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
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.status(200).json(newUser);

        // req.session.save(() => {
        //     req.session.user_id = User.id;
        //     req.session.loggedIn = true;

        //     
        // });

    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;