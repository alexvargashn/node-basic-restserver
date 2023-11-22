const  mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});

        console.log('Database connection online.')
    } catch (error) {
        console.log(error);
        throw new Error('Has been an error starting the database connection: ');
    }
}

module.exports = {
    dbConnection
}