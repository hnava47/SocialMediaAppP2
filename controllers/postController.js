const { Post } = require('../models');

module.exports = {
    feedView: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        res.render('feed');
    },
    createPost: async (req, res) => {
        const { creatorId,  message } = req.body;

        if (!creatorId || !message) {
            return res.status(401).json({ error: 'Must include valid creatorId and message' });
        }

        try {
            const post = await Post.create({
                creatorId,
                message
            });
            res.json(post);
        } catch (e) {
            res.json(e);
        }
    }
};
