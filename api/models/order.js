const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  productId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true},
  quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', OrderSchema);
