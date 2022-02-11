const {
    Comment,
    Heart,
    Post,
    User
} = require('../models');
const sequelize = require('sequelize');

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
    },
    viewAllPosts: async function (req, res) {
        try {
            const allPosts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Heart,
                        attributes: ['id']
                    },
                    {
                        model: Comment,
                        attributes: ['id']
                    }
                ]
            });
            res.json(allPosts);
        } catch (e) {
            res.json(e);
        }
    },
    viewUserPosts: async function (req, res) {
        try {
            const userPosts = await Post.findAll({
                where: {
                    creatorId: req.params.userId
                }
            });

            res.json(userPosts);
        } catch (e) {
            res.json(e);
        }
    }
};
