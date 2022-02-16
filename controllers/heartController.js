const { Heart } = require('../models');

module.exports = {

    // // viewHearts;
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

    // // createHearts;
    createHeart: async (req, res) => {
        console.log(req.body);
        try {
            const { creatorId, postId } = req.body
            await Heart.create({ creatorId: creatorId, postId: postId })
            res.status(201).send('heart added to post')
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
