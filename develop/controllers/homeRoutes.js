const router = require('express').Router();
const { Blog, User, Comment } = require('../models');



router.get('/loginController', async (req, res) => {
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



router.get('/', async (req, res) => {   //Query all blogs from the database using the Sequelize `findAll` method
    try {
        const allBlogs = await Blog.findAll({
            include: [  //includes the User model in the query
                {
                    model: User,
                    attributes: ['name'],   //specify that to include the 'name' attribure of the user

                },
            ],
        });
        const blogs = allBlogs.map((blog) => blog.get({ plain: true })); //maps over all elements of of allBlogs and serialeze them
        //serialize to make the data easier to handle/reaD

        console.log(blogs);
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
        console.log(req.session.logged_in);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in,
            blog_id: blog.id,
        });
    } catch (error) {
        res.status(500).json(error)
    }
});
router.get('/dashboard', async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          include: [{ model: Blog }],
        });
    
        const users = userData.get({ plain: true });
        
    
        res.render('dashboard', {
          ...users,
          logged_in: req.session.logged_in
        });
        console.log(users);
        console.log(req.session);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;