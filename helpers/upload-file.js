const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'jfif'], folder = '') => {
    return new Promise( (resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length -1];

        if(!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed. You could to use one of this: ${validExtensions}`);
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if(err) {
                return reject(err);
            }

            resolve(tempName);
        });
    });
}

module.exports = {
    uploadFile
}