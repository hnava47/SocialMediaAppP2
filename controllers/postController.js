const {
    Comment,
    Heart,
    Post,
    User
} = require('../models');

const { each } = require('lodash');

module.exports = {
    viewAllPosts: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        try {
            const allPostsData = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Heart,
                        attributes: ['id', 'creatorId']
                    },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['firstName', 'lastName']
                            }
                        ]
                    }
                ],
                order: [
                    ["updatedAt", "DESC"]
                ]
            });

            const allPosts = allPostsData.map(post => post.get({ plain: true }))

            each(allPosts, (post) => {
                each(post.hearts, heart => {
                    if (heart.creatorId === req.session.user.id) {
                        post.isLikedByUser = true;
                        post.heartId = heart.id;
                    }
                })
            });

            res.render('feed', {
                allPosts,
                user: req.session.user
            });
        } catch (e) {
            res.json(e);
        }
    },
    viewUserPosts: async (req, res) => {
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
    },
    viewPost: async (req, res) => {
        try {
            const getPost = await Post.findByPk(req.params.postId);

            res.json(getPost);
        } catch (e) {
            res.json(e);
        }
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
    updatePost: async (req, res) => {
        const { message } = req.body;

        try {
            await Post.update(
                { message },
                { where: { id: req.params.postId } }
            );

            res.status(200).json({ message: 'Post was successfully updated' });
        } catch (e) {
            res.json(e);
        }
    },
    deletePost: async (req, res) => {
        try {
            const deletePost = await Post.findByPk(req.params.postId);

            await Post.destroy({
                where: { id: req.params.postId }
            });

            res.json(deletePost);
        } catch (e) {
            res.json(e);
        }
    }
};
