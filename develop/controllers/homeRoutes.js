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



router.get('/homepage', async (req, res) => {   //Query all blogs from the database using the Sequelize `findAll` method
    try {
        const allBlogs = await Blog.findAll({
            include: [  //includes the User model in the query
                {
                    model: User,
                    attributes: ['name'],   //specify that to include the 'name' attribure of the user

                },
            ],
        });

        const blogs = allBlogs.map((blog) => blog.get({plain:true})); //maps over all elements of of allBlogs and serialeze them
        //serialize to make the data easier to handle/reaD
        
        res.render('homepage', {
            blogs,
            logged: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;