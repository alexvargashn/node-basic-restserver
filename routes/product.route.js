const { Router } = require('express');
const { check } = require('express-validator');
const { getProduct, getProducts, createProducto, deleteProduct, updateProduct } = require('../controllers/product.controller');
const { existProductById, existCategoryById } = require('../helpers/db-validators');
const { validateFields } = require('../helpers/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Obtener todas las Productos - publico
router.get('/', getProducts); 

// Obtener una Producto por id - publico
router.get('/:id', [
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], getProduct); 

// Crear Producto - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'Is not a Mongo Id').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
], createProducto); 

// Actualizar una Producto - privado - cualquier persona con un token valido
router.put('/:id', [
    validateJWT,
    check('id', 'Is not a Mongo Id').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], updateProduct); 

// Borrar una Producto - privado - cualquier persona con un token valido
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a Mongo Id').isMongoId(),
    check('id').custom(existProductById),
    validateFields
], deleteProduct); 


module.exports = router;