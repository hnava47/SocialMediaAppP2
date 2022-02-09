const { Post } = require('../models');

module.exports = {
    feedView: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        res.render('feed');
    },
    createPost: async (req, res) => {
        const { message } = req.body;

        if (!message) {
            return res.status(401).json({ error: 'Must include a message' });
        }

        try {
            const post = await Post.create({
                creatorId: req.session.user.id,
                message
            });
            res.json(post);
        } catch (e) {
            res.json(e);
        }
    }
};
