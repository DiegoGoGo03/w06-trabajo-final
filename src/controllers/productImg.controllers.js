const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path')
const fs = require('fs')

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});


const create = catchError(async(req, res) => {
    const { filename } = req.file
    
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    const result = await ProductImg.create({ filename, url })
    return res.sendStatus(201).json(result)
});



const remove = catchError(async(req, res) => {
    const { id } = req.params;

    const image = await ProductImg.findByPk(id)
    if (!image) return res.sendStatus(404)
        const imagePath = path.jon(__dirname, '..', 'public', 'uploads', `${image.filename}`)

    fs.unlinkSync(imagePath)

    await image.destroy()

    return res.sendStatus(204)

    // const result = await ProductImg.destroy({ where: {id} });
    // if(!result) return res.sendStatus(404);
    // return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove,
}