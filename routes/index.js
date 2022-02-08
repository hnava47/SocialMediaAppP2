const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const {
    loginView,
    signupView,
    feedView
} = require('../controllers/userController');

router.get('/login', loginView);
router.get('/signup', signupView);
router.get('/feed', feedView);
router.use('/api', apiRoutes);

module.exports = router;
