// Require 'dotenv' library to use global variables
require('dotenv').config()

const express = require('express');
const cors = require('cors');
 const  {dbConnection} = require('./../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usersPath: '/api/users',
            rolesPath: '/api/roles',
            authPath:  '/api/auth'
        };

        this.dbConnect();

        this.middlewares();

        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.usersPath, require('../routes/user.route'));
        this.app.use(this.paths.rolesPath, require('../routes/role.route'));
        this.app.use(this.paths.authPath, require('../routes/auth.route.js'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running on port: ', this.port);
        })
    }
}

module.exports = Server;