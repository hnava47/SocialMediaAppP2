const router = require('express').Router();
const {
    viewUserPosts
} = require('../../../../controllers/postController');

router.get('/:userId', viewUserPosts);

module.exports = router;
