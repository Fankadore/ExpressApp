# ExpressApp
RESTful API with user authorization via JWT

#User Requests
| Request | Endpoint       | Body                                     |  Auth Required |
|---------|----------------|------------------------------------------|----------------|
| POST    | /users/signup  | {"username": String, "password": String} |      false     |
| POST    | /users/signin  | {"username": String, "password": String} |      false     |
| DELETE  | /users/:userId |                                          |      true      |

#Product Requests
| Request | Endpoint             | Body                              |  Auth Required |
|---------|----------------------|-----------------------------------|----------------|
| GET     | /products            |                                   |      false     |
| GET     | /products/:productId |                                   |      false     |
| POST    | /products            | {"name": String, "price": Number} |      true      |
| PATCH   | /products/:productId | {"name": String, "price": Number} |      true      |
| DELETE  | /products/:productId |                                   |      true      |

#Order Requests
| Request | Endpoint         | Body                                        | Auth Required |
|---------|------------------|---------------------------------------------|---------------|
| GET     | /orders          |                                             |      true     |
| GET     | /orders/:orderId |                                             |      true     |
| POST    | /orders          | {"productId": ObjectId, "quantity": Number} |      true     |
| PATCH   | /orders/:orderId | {"productId": ObjectId, "quantity": Number} |      true     |
| DELETE  | /orders/:orderId |                                             |      true     |
