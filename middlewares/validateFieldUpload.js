const { response } = require("express");


const validateFieldUpload = (req, res = response, next) => {
    console.log(req.files);
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            ok: false,
            msg: 'There is not files on request.'
        });

        next();
    }
}

module.exports = {
    validateFieldUpload
}