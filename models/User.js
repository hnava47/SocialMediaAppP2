const { Model, DataTypes, UUIDV4 } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validators: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validators: {
                len: [8]
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'user'
    }
);

module.exports = User;
