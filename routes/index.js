const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const {
    loginView,
    signupView
} = require('../controllers/userController');

router.get('/api', apiRoutes);

module.exports = router;
