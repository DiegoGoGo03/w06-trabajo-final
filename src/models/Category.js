const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require("bcrypt")

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

Category.beforeCreate(async (category) => {
    const password = category.password
    const hashPassword = await bcrypt.hash(password, 10)
    category.password = hashPassword
})

module.exports = Category;