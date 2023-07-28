const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
  validPassword(pass) {
    return bcrypt.compareSync(pass, this.password);   // Check if the provided password matches the hashed password in the database
  }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
},
{
  hooks: {
    //hook will activate before a new instance is created and saved to the db
    beforeCreate: async (newUserData) => {
      //we take the password from userData and hashi it with bycrypt, then the 2nd argument is the number of rounds bycrypt will go through the salt
      newUserData.password = await bcrypt.hash(newUserData.password, 10);

      return newUserData;   //returns the new hashed password, and will be used to creat the new User in the db
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    },
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;



/*
twinkieeater0394@gmail.com

twinkieeater1234
*/