const router = require('express').Router();
const {
    createComment,
    deleteComment,
    updateComment
} = require('../../../controllers/commentController')

 router.post('/', createComment);

 router.route('/:commentId')
    .patch(updateComment)
    .delete(deleteComment);

module.exports = router;
