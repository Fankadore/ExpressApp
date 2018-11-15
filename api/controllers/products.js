const mongoose = require('mongoose');
const Product = require('../models/product.js');

const getAllProducts = (req, res, next) => {
  Product.find()
  .select('_id name price')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          request: {
            type: 'GET',
            url: 'http://localhost:2000/products/' + doc._id
          }
        };
      })
		};
		
    res.status(200).json(response);
  })
  .catch(error => res.status(500).json(error));
};

const addProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    price: req.body.price
  });

  product.save()
  .then(result => {
    res.status(201).json({
      message: "Created product",
      product: product,
      request: {
        type: 'GET',
        url: 'http://localhost:2000/products/' + product._id
      }
    })
  })
  .catch(error => res.status(500).json(error));
};

const getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
  .select('_id name price')
  .exec()
  .then(doc => {
    if (doc) {
			res.status(200).json({
				product: doc,
				request: {
					type: 'GET',
					url: 'http://localhost:2000/products'
				}
			});
    }
    else {
			res.status(404).json({
				message: "No product found with that Id"
			});
		}
	})
  .catch(error => res.status(500).json(error));
};

const updateProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.update({ _id: id }, { $set: req.body })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Updated product",
      request: {
        type: 'GET',
        url: 'http://localhost:2000/products/' + id
      }
    });
  })
  .catch(error => res.status(500).json(error));
};

const removeProduct = (req, res, next) => {
	const id = req.params.productId;
	
  Product.remove({ _id: id })
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Deleted product",
      request: {
        type: 'POST',
        url: 'http://localhost:2000/products',
        body: {name: 'String', price: 'Number'}
      }
    });
  })
  .catch(error => res.status(500).json(error));
};

module.exports = {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  removeProduct
};
