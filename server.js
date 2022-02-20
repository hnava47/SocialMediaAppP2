require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const sequelize = require('./config');
const routes = require('./routes');
const helpers = require('./utils/hbsHelper');
let callbackURL;

const app = express();
const PORT = process.env.PORT || 3001;

const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
};

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
hbs.handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionSettings));
app.use(routes);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

if (process.env.JAWSDB_URL) {
    callbackURL = 'https://socialmediap2.herokuapp.com/auth/facebook/callback'
} else {
    callbackURL = 'http://localhost:3001/auth/facebook/callback'
}

passport.use(new facebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name']
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});
