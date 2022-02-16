const router = require('express').Router();
const {createComment, deleteComment, updateComment} = require('../../../controllers/commentController') 
// TODO: router.get('/:postId', viewComments)

 router.post('/', createComment);
 router.delete('/', deleteComment);
 router.put('/:id', updateComment)

// TODO: router.route('/:commentId')
//     .patch(updateComment)
//     .delete(deleteComment);

module.exports = router;
