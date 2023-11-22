const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne( { email });
        if(!user) {
            return res.json({
                ok: false,
                msg: 'There is no one user for the email given'
            });
        }

        if(!user.state) {
            return res.status(401).json({
                ok: false,
                msg: 'User is inactive in system, contact the administrator.'
            });
        }

        if(!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: 'User or password does not match with correct values.'
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the system administrator.'
        })
    }
}

module.exports = {
    login
}