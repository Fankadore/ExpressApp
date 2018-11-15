const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../keys.js');
const User = require('../models/user.js');

const signup = (req, res, next) => {
  User.find({ username: req.body.username })
  .exec()
  .then(users => {
    if (users.length > 0) {
      res.status(409).json({
        message: "Username already exists"
      });
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json(error);
        }
        else {
          const user = new User({
            _id: new mongoose.Types.ObjectId,
            username: req.body.username,
            password: hash
          });
          user.save()
          .then(result => {
            res.status(201).json({
              message: "Created user"
            })
          })
          .catch(error => res.status(500).json(error));
        }
      });
    }
  })
  .catch(error => res.status(500).json(error));
};

const signin = (req, res, next) => {
	User.find({ username: req.body.username })
	.exec()
	.then(users => {
		if (users.length > 0) {
			bcrypt.compare(req.body.password, users[0].password, (err, match) => {
				if (!err) {
					if (match) {
						const token = jwt.sign({
							username: users[0].username,
							userId: users[0]._id
						},
						JWT_KEY,
						{
							expiresIn: "1h"
						});
						res.status(200).json({
							message: "Auth successful",
							token
						});
					}
					else {
						res.status(401).json({
							message: "Auth failed"
						});
					}
				}
				else {
					res.status(401).json({
						message: "Auth failed"
					});
				}
			});
		}
		else {
			res.status(401).json({
				message: "Auth failed"
			});
		}
	})
	.catch(error => res.status(500).json(error));
};

const deleteUser = (req, res, next) => {
	const id = req.params.userId;
	User.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Deleted user"
		});
	})
	.catch(error => res.status(500).json(error));
};

module.exports = {
  signup,
  signin,
  deleteUser
};
