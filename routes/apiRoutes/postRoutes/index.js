const router = require('express').Router();
const userRoutes = require('./userRoutes');
const {
    viewAllPosts,
    viewPost,
    createPost,
    updatePost,
    deletePost
} = require('../../../controllers/postController');

router.use('/user', userRoutes);

router.get('/', viewAllPosts);

router.post('/', createPost);

router.route('/:postId')
    .get(viewPost)
    .patch(updatePost)
    .delete(deletePost);

module.exports = router;
