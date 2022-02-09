const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        creatorId: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.UUID,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment
