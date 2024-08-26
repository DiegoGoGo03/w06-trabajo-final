const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Product = require('./Product');
const User = require('./User');

const Cart = sequelize.define('Cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Asociaciones
Cart.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;
