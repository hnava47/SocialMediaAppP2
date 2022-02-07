const {User} = require('../models');

module.exports = {
    login: async (req, res) => {
        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const userFound = userData.get({plain: true});
            if (userFound.password === req.body.password) {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.user = userFound;
                    res.json({success: true});
                });
            }
        } catch (e) {
            res.json(e);
        }
    }
};
