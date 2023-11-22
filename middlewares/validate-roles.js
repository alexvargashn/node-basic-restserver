const { response } = require("express");


const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            ok: false,
            msg: 'It is necesary to validate the token first'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN') {
        return res.status(401).json({
            ok: false,
            msg: `Action not valid to ${name}`
        });
    }
    next();
}

module.exports = {
    isAdminRole
}