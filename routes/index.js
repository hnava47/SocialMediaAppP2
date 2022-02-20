const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');
const {
    homePage,
    loginView,
    signupView
} = require('../controllers/userController');
const {
    viewAllPosts
} = require('../controllers/postController');

router.get('/', homePage);
router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/feed', viewAllPosts);

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

module.exports = router;
