const router = require('express').Router();
const { Blog, User } = require('../models');



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
        const allBlogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],

                },
            ],
        });

        const blogs = allBlogs.map((blog) => blog.get({plain:true}));
        console.log(blogs);
        
        res.render('homepage', {
            blogs,
            logged: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;