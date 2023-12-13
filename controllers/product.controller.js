const { response } = require('express');
const Product = require('./../models/product');

const getProducts = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('category', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        products
    });
}

const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const Product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json(Product);
}

const createProducto = async (req, res = response) => {
    const { state, user, ...body } = req.body

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `Product ${productDB.name} already exist.`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data);
    await product .save();

    res.status(201).json({
        ok: true,
        product
    });
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
        ok: true,
        product
    });
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({
        ok: true,
        deletedProduct
    });
}

module.exports = {
    getProducts,
    getProduct,
    createProducto,
    updateProduct,
    deleteProduct
}