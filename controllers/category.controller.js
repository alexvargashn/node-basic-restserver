
const { response } = require('express');
const Category = require('./../models/category');

const getCategories = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        categories
    });
}

const getCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        ok: true,
        category
    });
}

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const description = req.body.description.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${categoryDB.name} already exist.`
        });
    }

    const data = {
        name,
        description,
        user: req.user._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json({
        ok: true,
        category
    });
}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    res.json({
        ok: true,
        category
    });
}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({
        ok: true,
        deletedCategory
    });
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}