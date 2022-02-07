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
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
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
        freezeTableName: true,
        modelName: 'user',
        hooks: {
            beforeCreate: async (user, options) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.email = user.email.toLowerCase();
                user.password = hashedPassword;
                return user;
            },
            beforeUpdate: async (user, options) => {
                user.email = user.email.toLowerCase();
                return user;
            }
        }
    }
);

module.exports = User;
