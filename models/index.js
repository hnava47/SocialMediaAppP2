const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'creatorId'
});

module.exports = {
    User,
    Post
};
