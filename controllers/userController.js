const { User } = require('../models');

module.exports = {
    loginView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }

        res.render('login');
    },
    login: async (req, res) => {
        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const userFound = userData.get({ plain: true });
            if (userFound.password === req.body.password) {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.user = userFound;
                    res.json({ success: true });
                });
            }
        } catch (e) {
            res.json(e);
        }
    },
    signUpView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/todos');
        }

        res.render('signup');
    },
    signUpHandler: async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;

        try {
            const createdUser = await User.create({
                firstName,
                lastName,
                username,
                email,
                password
            });

            const user = createdUser.get({ plain: true });

            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = user;
                res.redirect('/todos');
            });
        } catch (e) {
            res.json(e);
        }
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.send({ status: true });
        });
    }
};
