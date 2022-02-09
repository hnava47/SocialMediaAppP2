const router = require('express').Router();
const {
    // viewAllPosts,
    createPost,
    // updatePost,
    // deletePost
} = require('../../../controllers/postController');

// router.get('/', viewAllPosts);

router.post('/', createPost);

// router.route('/:postId')
//     .patch(updatePost)
//     .delete(deletePost);

module.exports = router;
