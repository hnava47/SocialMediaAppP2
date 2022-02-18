const { Comment } = require('../models');

module.exports = {
    createComment: async (req,res) => {
        const { creatorId, postId, message } = req.body;
        try {
            const createdComment = await Comment.create({
                // creatorId: req.session.user.id,
                creatorId,
                postId,
                message
            });

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
