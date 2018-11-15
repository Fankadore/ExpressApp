const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');
const ProductsController = require('../controllers/products.js');

router.get('/', ProductsController.getAllProducts);
router.post('/', checkAuth, ProductsController.addProduct);
router.get('/:productId', ProductsController.getProduct);
router.patch('/:productId', checkAuth, ProductsController.updateProduct);
router.delete('/:productId', checkAuth, ProductsController.removeProduct);

module.exports = router;
