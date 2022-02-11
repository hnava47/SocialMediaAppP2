const req = require('express/lib/request');
const res = require('express/lib/response');
const { Comment } = require('../models');

module.exports = {
    
    createComment: (req,res) => {
    // TODO: Add functions for comments (createComment, updateComment, deleteComment)
        Comment.create({...req.body,  creatorId: req.session.user.id  })
            .then(newComment => {
                console.log(newComment);
                res.json(newComment)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    deleteComment: (req,res) => {
        Comment.destroy({ 
            where:{
                id:req.params.id
            }
        })
        .then(affectedRow => {
                if(affectedRow >0 ){
                    s.status(200).end()
                }  else {
                    res.status(404).end()
                }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },
 

    updateComment: (req,res) => {
        // TODO: Add functions for comments (createComment, updateComment, deleteComment)
            Comment.update({...req.body,  creatorId: req.session.user.id  })
                .then(editComment => {
                    console.log(editComment);
                    res.json(editComment)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        },
    
    
            
};
