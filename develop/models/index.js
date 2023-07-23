const User = require('./User');
const Blog = require('./Blog');


// defines one to many relations between user and blog
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

//defines a one-to-one relation between blog to user
Blog.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = {User, Blog};