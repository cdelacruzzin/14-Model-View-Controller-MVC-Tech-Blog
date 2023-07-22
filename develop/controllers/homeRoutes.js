const router = require('express').Router();



router.get('/', async (req, res) => {
    try {
        res.render('./login/loginController')
    } catch (error) {
        res.json(error)
    }
})

router.get('/login', async (req, res) => {
    res.render('./login/login');
});

router.get('/signup', async (req, res) => {
    res.render('./login/signup');
});

router.get('/homepage', async (req, res) => {
    res.render('./homepage');
})

module.exports = router;