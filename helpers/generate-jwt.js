const jwt = require("jsonwebtoken");

const generateJWT = (uid = '') => {
    return new Promise( (resolve, reject ) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '5h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('It was not possible to generate the JWT.');
            } else {
                console.log(token);
                resolve(token);
            }
        })
    } )
}

module.exports = {
    generateJWT
}