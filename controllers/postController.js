const { Post } = require('../models');

module.exports = {
    feedView: async (req, res) => {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        res.render('feed');
    }
};
