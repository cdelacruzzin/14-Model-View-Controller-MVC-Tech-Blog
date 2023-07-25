const router = require('express').Router();
const { User } = require('../../models');


// Login - /api/users/login
router.post('/login', async (req, res) => {

  try {
    const userData = await User.findOne({ where: { email: req.body.email } });


    console.log(req.body);
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.validPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// CREATE new user - /api/users/signup

router.post('/signup', async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {    //method to save the session
      req.session.user_id = newUser.id;   //the user's id is stored in the session
      req.session.logged_in = true;   //the 'logged_in property is set to true. a flag to check whether the user is logged in

      console.log(newUser);
      res.status(200).json(newUser);
    });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
});




module.exports = router;