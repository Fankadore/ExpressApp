const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');
const OrdersController = require('../controllers/orders.js');

router.get('/', checkAuth, OrdersController.getAllOrders);
router.post('/', checkAuth, OrdersController.createOrder);
router.get('/:orderId', checkAuth, OrdersController.getOrder);
router.patch('/:orderId', checkAuth, OrdersController.updateOrder);
router.delete('/:orderId', checkAuth, OrdersController.cancelOrder);

module.exports = router;
