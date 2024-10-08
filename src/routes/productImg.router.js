const { getAll } = require('../controllers/productImg.controllers');
const { create, remove } = require('../controllers/productImgCloudinary.controllers');

const express = require('express')
const upload = require('../utils/multer')


const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image_redmi'), create);

routerProductImg.route('/:id')
    .delete(remove)

module.exports = routerProductImg