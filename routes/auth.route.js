const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../helpers/validateFields');

const router = Router();

router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;