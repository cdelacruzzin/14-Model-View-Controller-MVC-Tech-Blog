const sequelize = require('../config/connection');
const {User} = require('../models');

const userData = require('./userData.json');

const seedData = async () => {
    await sequelize.sync({force:true});     //syncs all the defined models to the database
    // force: true will drop the defined tables in the db and create them again.


    //
    const allUsers = await User.bulkCreate(userData, {  //creates multiple instances where each element of the userData array represents a new row in the database
        individualHooks: true,  //ensures that each hooks are created for each row being created.
        returning: true,
      });

      process.exit(0);

};

seedData();