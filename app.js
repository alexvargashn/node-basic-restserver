// Require 'dotenv' library to use global variables
require('dotenv').config()

const Server = require('./models/server');

const server = new Server();

server.listen();

