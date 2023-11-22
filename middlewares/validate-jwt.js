const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('rs-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is not token on request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);
        if(!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Token is not valid'
            })
        }

        if(!user.state) {
            return res.status(401).json({
                ok: false,
                msg: 'User is inactive in system, contact the administrator'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }
}

module.exports = {
    validateJWT
}