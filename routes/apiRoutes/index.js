const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const heartRoutes = require('./heartRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/comments', commentRoutes);
router.use('/hearts', heartRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
