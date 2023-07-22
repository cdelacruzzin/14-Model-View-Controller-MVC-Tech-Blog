const router = require('express').Router();
const Blog = require('../models');



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
    try {
        const allProjects = await Blog.findAll({
            
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;