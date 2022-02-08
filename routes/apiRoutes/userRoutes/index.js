const router = require('express').Router();
const {
    login,
    signupHandler
} = require('../../../controllers/userController');

router.post('/login', login);
router.post('/signup', signupHandler);

module.exports = router;
