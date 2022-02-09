const Comment = require('./Comment');
const Heart = require('./Heart');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(User, {
    foreignKey: 'creatorId'
}),

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

Heart.belongsTo(User, {
    foreignKey: 'creatorId'
});

Heart.belongsTo(Post, {
    foreignKey: 'postId'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.hasMany(Heart, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'creatorId'
});

User.hasMany(Comment, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

User.hasMany(Heart, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'creatorId',
    onDelete: 'CASCADE'
});

module.exports = {
    Comment,
    Heart,
    Post,
    User
};
