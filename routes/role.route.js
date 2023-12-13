const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getOne, createRole, updateRole, deleteRole, getAll } = require('../controllers/role.controller');
const { existRoleById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getAll);

router.get('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existRoleById),
    validateFields
], getOne)

router.post('/', [
    check('role', 'The role is required').not().isEmpty(),
    validateFields
], createRole);

router.patch('/:id', [
    validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existRoleById),
    validateFields
], updateRole);

router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existRoleById),
    validateFields
], deleteRole);




module.exports = router;