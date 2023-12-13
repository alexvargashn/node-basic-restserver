const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const { existCategoryById } = require('../helpers/db-validators');
const { validateFields } = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories); 

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], getCategory); 

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], createCategory); 

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a mongo id').isMongoId(),
    check('id').custom(existCategoryById),
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], updateCategory); 

// Borrar una categoria - privado - cualquier persona con un token valido
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a Mongo Id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields
], deleteCategory); 


module.exports = router;