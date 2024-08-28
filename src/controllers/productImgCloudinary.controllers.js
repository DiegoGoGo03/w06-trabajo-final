const catchError = require('../utils/catchError');


const { uploadToCloudinary, deleteFromCloudinary } = require('../models/cloudinary');
const ProductImg = require('../models/ProductImg');



const create = catchError(async(req, res) => {
    const { path, filename } = req.filename
    const { url, public_id } = await uploadToCloudinary(path, filename)
    console.log(public_id)

    const body = { url, filename: public_id }
    const result = await ProductImg.create(body)
    return res.status(201).json(result)
});

// Se borra GetOne

const remove = catchError(async(req, res) => {
    const { id } = req.params
    const image = await ProductImg.findByPk(id)
    if (!iamge) return res.sendStatus(404)
    await deleteFromCloudinary(image.filename)
    await image.destroy()
    return res.sendStatus(204)
});

// Se borra Update

module.exports = {
    create,
    remove
}