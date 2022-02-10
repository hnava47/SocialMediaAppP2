const router = require('express').Router();
const fbRoutes = require('./fbRoutes');

router.use('/facebook', fbRoutes);

module.exports = router;
