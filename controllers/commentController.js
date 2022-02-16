const { Comment } = require('../models');

module.exports = {
    createComment: async (req,res) => {
        const { postId, message } = req.body;
        try {
            const createdComment = await Comment.create({
                creatorId: req.session.user.id,
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
            await Comment.destroy({
                where:{
                    id:req.params.commentId
                }
            });

            res.status(200).json({ message: 'Comment deleted successfully' });
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

            res.status(200).json({ message: 'Comment was updated successfully' });
        } catch (e) {
            res.json(e);
        }
    }
};
