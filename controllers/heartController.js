const { Heart } = require('../models');

module.exports = {
    viewHearts: async (req, res) => {
        const { creatorId, postId } = req.params
        console.log(req.params);
        if (creatorId && postId) {
            return true;
            //if equall true the display solid like/ heart
        } else {
            return false;
        }
        // else if they dont come to true display transperent like/heart
    },
    createHeart: async (req, res) => {
        try {
            const { postId } = req.body
            const createHeart = await Heart.create({
                creatorId: req.session.user.id,
                postId
            })
            res.json(createHeart);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    deleteHeart: async (req, res) => {
        try {
            const { heartId } = req.params
            // not waiting for click waitting for data base
            await Heart.destroy({
                where: {
                    id: heartId
                }
            });
            res.status(201).send('deleted heart')
        } catch (error) {
            res.status(500).json(err)
        }

    }
    // TODO: Add functions for hearts (createHeart, deleteHeart)

};
