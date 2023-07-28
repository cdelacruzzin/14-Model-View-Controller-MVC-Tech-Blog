const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(withAuth);
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id:req.body.blog_id,
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;