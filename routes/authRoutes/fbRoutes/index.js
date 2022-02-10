const router = require('express').Router();
const passport = require('passport');
const {
    facebookLogin
} = require('../../../controllers/userController');

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/callback', passport.authenticate('facebook'), facebookLogin);

module.exports = router;
