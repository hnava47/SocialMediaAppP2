const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config');

class Heart extends Model {}

Heart.init(
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
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'heart'
    }
);

module.exports = Heart;
