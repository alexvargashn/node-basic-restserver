const {Router} = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getOne, createRole, updateRole, deleteRole, getAll } = require('../controllers/role.controller');
const { isValidRole } = require('../helpers/db-validators');

const router = Router();

router.get('/', getAll);

router.get('/:role', [
    check('role').custom(isValidRole),
    validateFields
], getOne)

router.post('/', [
    check('role', 'The name is required').not().isEmpty(),
    validateFields
], createRole);

router.put('/:role', [
    check('role').custom(isValidRole),
    validateFields
], updateRole);

router.delete('/:role', [
    validateJWT,
    check('role').custom(isValidRole),
    validateFields
], deleteRole);




module.exports = router;