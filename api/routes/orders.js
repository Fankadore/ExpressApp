const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order.js');
const Product = require('../models/product.js');

router.get('/', (req, res, next) => {
	Order.find()
	.select('_id productId quantity')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			orders: docs.map(doc => {
				return {
					_id: doc._id,
					productId: doc.productId,
					quantity: doc.quantity,
					request: {
						type: 'GET',
						url: 'http://localhost:2000/orders/' + doc._id
					}
				};
			})
		};

		res.status(200).json(response);
	})
	.catch(error => res.status(500).json(error));
});

router.post('/', (req, res, next) => {
	Product.findById(req.body.productId)
	.exec()
	.then(product => {

		if (product) {
			const order = new Order({
				_id: new mongoose.Types.ObjectId,
				productId: req.body.productId,
				quantity: req.body.quantity
			});
			order.save()
			.then(result => {
				res.status(201).json({
					message: "Created order",
					order,
					request: {
						type: 'GET',
						url: 'http://localhost:2000/orders/' + order._id
					}
				});
			})
			.catch(error => res.status(500).json(error));
		}
		else {
			res.status(404).json({
				message: "Product not found"
			});
		}
	})
	.catch(error => res.status(500).json(error));
});

router.get('/:orderId', (req, res, next) => {
	Order.findById(req.params.orderId)
	.exec()
	.then(order => {
		res.status(200).json({
			order,
			request: {
				type: 'GET',
				url: 'http://localhost:2000/orders'
			}
		});
	})
	.catch(error => res.status(500).json(error));
});

router.patch('/:orderId', (req, res, next) => {
	const id = req.params.orderId;
	const updateOps = {};
	for (let ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	
	Order.update({ _id: id }, { $set: updateOps })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Updated order",
			request: {
				type: 'GET',
				url: 'http://localhost:2000/orders/' + id
			}
		});
	})
	.catch(error => res.status(500).json(error));
});

router.delete('/:orderId', (req, res, next) => {
	Order.findById(req.params.orderId)
	.exec()
	.then(order => {

	})
	.catch(error => res.status(500).json(error));

	Order.deleteOne({ _id: req.params.orderId })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Deleted order",
			request: {
				type: 'POST',
				url: 'http://localhost:2000/orders',
				body: {productId: 'ObjectId', quantity: 'Number'}
			}
		});
	})
	.catch(error => res.status(500).json(error));
});

module.exports = router;
