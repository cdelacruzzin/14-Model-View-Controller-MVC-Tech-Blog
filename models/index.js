const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./comments');

// defines one to many relations between user and blog
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Defines a one-to-many relation from Blog to Comment
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

// Defines a many-to-one relation from Blog to User
Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

// Defines a many-to-one relation from Comment to Blog
Comment.belongsTo(`Blog`, {
    foreignKey: 'blog_id',
});

// Defines a many-to-one relation from Comment to User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = {User, Blog, Comment};