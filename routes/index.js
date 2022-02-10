const router = require('express').Router();
const passport = require('passport');
const apiRoutes = require('./apiRoutes');
const {
    loginView,
    facebookLogin,
    signupView
} = require('../controllers/userController');
const {
    feedView
} = require('../controllers/postController');
const { route } = require('./apiRoutes');

router.get('/login', loginView);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }), facebookLogin);
router.get('/signup', signupView);
router.get('/feed', feedView);
router.use('/api', apiRoutes);

module.exports = router;
