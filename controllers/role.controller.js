const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Role = require('../models/role');


/**
 * Sends all users in database in paginated way. You could send a 
 * 'limit' parameter that says to the query what is the maximum 
 * number of users to get and a 'since' parameter for the initial 
 * point at index.
 * @param {request} req 
 * @param {response} res 
 */
const getAll = async (req = request, res = response) => {
    const { limit = 5, since = 0 } = req.query;
    const query = { state: true };

    const [total, roles] = await Promise.all([
        Role.countDocuments(query),
        Role.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        roles
    });
}

const getOne = async (req = request, res = response) => {
    const { id } = req.params;

    const role = await Role.findById(id);
    res.json({
        ok: true,
        role
    })
}

const updateRole = async (req, res = response) => {
    const { id } = req.params;

    const role = await Role.findByIdAndUpdate(id, { ...req.body }, { new: true });

    res.json({
        ok: true,
        role
    });

}

const createRole = async (req = request, res = response) => {
    const role = new Role({ ...req.body });

    await role.save();

    res.json({
        ok: true,
        msg: 'All ok',
        role
    })
}


const deleteRole = async (req, res = response) => {
    const { id } = req.params;

    const role = await Role.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json({
        ok: true,
        role
    });
}

module.exports = {
    getAll,
    getOne,
    createRole,
    updateRole,
    deleteRole
}