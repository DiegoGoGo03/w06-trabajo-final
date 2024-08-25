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


const create = catchError(async(req, res) => {
    const userId = req.user.id

    const cart = await Cart.findAll({
        where: { userId },
        raw: true,
        attributes: ['quantity', 'userId', 'productId']
    })

    if (!cart) return res.sendStatus(404)

        const result = await Purchase.bulkCreate(cart)
        await Cart.destroy({ where: { userId } })
        return res.status(201).json(result)

    // console.log(cart)

})

module.exports = {
    getAll,
    create
}