const { Comment } = require('../models');
const { create } = require('../models/Comment');

module.exports = {
    createComment: async (req,res) => {
        const { postId, message } = req.body;
        try {
            const createdCommentData = await Comment.create({
                creatorId: req.session.user.id,
                postId,
                message
            });

            const createdComment = createdCommentData.get({ plain: true });

            createdComment.user = {
                firstName: req.session.user.firstName,
                lastName: req.session.user.lastName
            };

            console.log(createdComment);

            res.json(createdComment);
        } catch (e) {
            res.json(e);
        }
    },
    deleteComment: async (req,res) => {
        try {
            const delComment = await Comment.findByPk(req.params.commentId)

            await Comment.destroy({
                where:{
                    id:req.params.commentId
                }
            });

            res.json(delComment);
        } catch (e) {
            res.json(e);
        }
    },
    updateComment: async (req,res) => {
        const { message } = req.body;
        try {
            await Comment.update(
                { message },
                { where: { id: req.params.commentId } }
            );

            const patchComment = await Comment.findByPk(req.params.commentId);

            res.json(patchComment);
        } catch (e) {
            res.json(e);
        }
    }
};
