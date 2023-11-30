const {Router} = require('express');
const {check} = require('express-validator');
const { getAll, createUser, getOne, updateUser, deleteUser, uploadImageUser } = require('../controllers/user.controller');
const { validateFields } = require('../helpers/validateFields');
const { existUserById, isValidRole, existEmail } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFieldUpload } = require('../middlewares/validateFieldUpload');

const router = Router();

router.get('/', getAll);

router.get('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isValidRole),
    validateFields
], getOne)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must contain at least 6 letters'),
    check('email', 'The email is not valid')
        .isEmail()
        .custom(existEmail),
    check('role').custom(isValidRole),
    validateFields
], createUser);

router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], updateUser);

router.put('/:id', [
    validateFieldUpload,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], uploadImageUser);

router.delete('/:id', [
    validateJWT,
    check('role').custom(isValidRole),
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser);




module.exports = router;