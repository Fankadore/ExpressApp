const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
