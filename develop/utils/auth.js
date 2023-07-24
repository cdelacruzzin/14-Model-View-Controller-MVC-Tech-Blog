const withAuth = (req, res, next) => {
    if (res.session.logged_in) {
        next();
    } else {
        res.render('/loginController');
    }
};

module.exports = withAuth;