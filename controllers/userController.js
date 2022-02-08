const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
    loginView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/feed');
        }

        res.render('login');
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ error: 'You must provide a valid email and password' });
        }

        try {
            const userData = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!userData) {
                return res.status(400).json({ error: 'No user with that email' });
            }

            const userFound = userData.get({ plain: true });

            const isMatchingPassword = await bcrypt.compare(password, userFound.password);

            if (isMatchingPassword) {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.user = userFound;
                });
                res.render('feed');
            } else {
                res.json({ success: false });
            }
        } catch (e) {
            res.json(e);
        }
    },
    signupView: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/feed');
        }

        res.render('signup');
    },
    signupHandler: async (req, res) => {
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
            });

            res.redirect('/feed');
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
