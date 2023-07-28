const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const BlogData = require('./blogData.json');

const seedData = async () => {
  await sequelize.sync({ force: true });     //syncs all the defined models to the database
  // force: true will drop the defined tables in the db and create them again.

  //
  const allUsers = await User.bulkCreate(userData, {  //creates multiple instances where each element of the userData array represents a new row in the database
    individualHooks: true,  //ensures that each hooks are created for each row being created.
    returning: true,
  });

  // for each element of the BlogData array, uses sequelize to create a new entry in the Blog db.
  for (const blog of BlogData){ 
    await Blog.create({
      ...blog,  // uses the spread operator to copy all properties from the blog object into the new Blog entry
      user_id: allUsers[Math.floor(Math.random() * allUsers.length)].id,  // assigns random user's id to the user_id of the Blog entry
    });
  }
  process.exit(0);

};

seedData();