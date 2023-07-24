const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {


    console.log(req.body);
    try {
        const newComment = await Comment.create({
            ...req.body
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;