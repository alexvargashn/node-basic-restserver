const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });

    if(!existRole) {
        throw new Error(`The role ${ role } not exist`);
    }
}

const existUserById = async (id) => {
    const existUserById = await User.findById(id);
    if(!existUserById) {
        throw new Error(`The user with ID: ${id} is not exist`);
    }
}

const existEmail = async (email) => {
    const exist = await User.findOne({email});

    if(exist) {
        throw new Error(`Already exist a user with email: ${email}`);
    }
}

module.exports = {
    isValidRole,
    existUserById,
    existEmail
}