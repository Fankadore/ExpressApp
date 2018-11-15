# ExpressApp
RESTful API with user authorization via JWT

| Request | Endpoint             | Body                              |  Auth Required |
|---------|----------------------|-----------------------------------|----------------|
| GET     | /products            |                                   |      false     |
| GET     | /products/:productId |                                   |      false     |
| POST    | /products            | {"name": String, "price": Number} |      true      |
| PATCH   | /products/:productId | {"name": String, "price": Number} |      true      |
| DELETE  | /products/:productId |                                   |      true      |
