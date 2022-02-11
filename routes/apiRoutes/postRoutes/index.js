const router = require('express').Router();
const {
    viewAllPosts,
    viewUserPosts,
    createPost,
    updatePost,
    // deletePost
} = require('../../../controllers/postController');

router.get('/', viewAllPosts);
router.get('/:userId', viewUserPosts);

router.post('/', createPost);

router.route('/:postId')
    .patch(updatePost);
//     .delete(deletePost);

module.exports = router;
