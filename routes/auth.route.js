const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../helpers/validateFields');
const { existEmail } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/login', [
    check('email', 'The email is not valid')
        .isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);

router.get('/verify', [
    validateJWT
], (req, res) => {
    if(req.user && req.user.state) {
        return res.json({
            ok: true,
            user: req.user
        })
    }
})

module.exports = router;