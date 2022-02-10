const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const {
    loginView,
    signupView
} = require('../controllers/userController');
const {
    feedView
} = require('../controllers/postController');

router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/feed', feedView);
router.use('/api', apiRoutes);

module.exports = router;
