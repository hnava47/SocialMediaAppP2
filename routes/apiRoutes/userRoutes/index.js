const router = require('express').Router();
const {
    login,
    signupHandler,
    logout
} = require('../../../controllers/userController');

router.post('/login', login);
router.post('/signup', signupHandler);
router.post('/logout', logout);

module.exports = router;
