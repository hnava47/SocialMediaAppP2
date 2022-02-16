const router = require('express').Router();
const {
    viewHearts,
    createHeart,
    deleteHeart,
} = require('../../../controllers/heartController');

router.get('/:postId', viewHearts);

router.post('/', createHeart);

router.delete('/:heartId', deleteHeart);

module.exports = router;
