const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const purchase = await Purchase.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                attributes: { exclude: ['updateAt', 'createdAt'] },
                include: [
                    {
                        model: Category,
                        attributes: ['name', 'id']
                    }
                ]
            }
        ]
    })
    return res.json(purchase)

});


const create = catchError(async (req, res) => {
    const userId = req.user.id;

    // Obtener todos los elementos del carrito del usuario
    const cart = await Cart.findAll({
        where: { userId },
        raw: true,
        attributes: ['quantity', 'userId', 'productId']
    });

    if (cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    // Crear compras basadas en los elementos del carrito
    const result = await Purchase.bulkCreate(cart);

    // Limpiar el carrito después de crear las compras
    await Cart.destroy({ where: { userId } });

    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create
}