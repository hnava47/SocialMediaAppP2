const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');


class Post extends Model {}

Post.init(
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
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'post'
    }
);

module.exports = Post;
