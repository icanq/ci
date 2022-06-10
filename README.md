# Express TDD

## TODO

Create Test Cases for User, Product and Cart

### POST/admin/login

> admin login

_Request Header_

```
none
```

_Request Body_

```
email : admin@admin.com
password : adminganteng
```

_Response(200)_

```
{
  id: 1,
  username: admin,
  email: admin@admin.com
  access_token : "token string"
}
```

_Response(400)_

```
{
  message : "Wrong email/password"
}
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### POST/register

> Register

_Request Header_

```
none
```

_Request Body_

```
username  : icanq
email     : icanq@mail.com
password  : okeoke
```

_Response(201)_

```
{
  id: 1,
  username: icanq,
  email: icanq@mail.com
}
```

_Response(400)_

```
{
  message : "username taken",
  message : "Username is required, cannot be blank",
  message : "Email have been registered",
  message : "Password is required cannot be blank",
  message : "Password minimal 6 character",

}
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### POST/login

> login

_Request Header_

```
none
```

_Request Body_

```
email : icanq@mail.com
password : okeoke
```

_Response(200)_

```
{
  access_token : "token string"
}
```

_Response(404)_

```
{
  message : 'Account not found'
}
```

_Response(400)_

```
{
  message : "Wrong email/password"
}
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### POST /products

> create product

_Request Header_

```
access_token : 'token string'
```

_Request Body_

```
{
  "name": "rendang daging mantap betul",
  "image_url": "https://www.kitchensanctuary.com/wp-content/uploads/2018/01/Beef-Rendang-square-FS-28.jpg",
  "price": 30000,
  "stock": 300,
}
```

_Response(201)_

```
{
    "id": 5,
    "name": "rendang daging mantap betul",
    "image_url": "https://www.kitchensanctuary.com/wp-content/uploads/2018/01/Beef-Rendang-square-FS-28.jpg",
    "price": 30000,
    "stock": 300,
    "UserId": 1,
    "updatedAt": "2020-12-18T02:45:27.504Z",
    "createdAt": "2020-12-18T02:45:27.504Z"
}
```

_Response(401)_

```
{
  message : 'login first'
}
```

_Response(400)_

```
{
  message : "Name is required, cannot be blank",
  message : "Name cannot be null",
  message : "ImageUrl is required, cannot be blank",
  message : "ImageUrl cannot be null",
  message : "Price is required, cannot be blank",
  message : "Price must be number",
  message : "Cannot set to minus",
  message : "Stock is required, cannot be blank",
  message : "Stock must be number",
  message : "Cannot set to minus",
}
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### GET /products

> fetch all products

_Request Header_

```
access_token : 'token string'
```

_Request Body_

```
{
  none
}
```

_Response(200)_

```
[
    {
        "id": 1,
        "name": "rendang rancak bana",
        "image_url": "https://asset.kompas.com/crops/gi24VPQMhftubxYIWPJATjHrxTA=/0x0:1000x667/750x500/data/photo/2020/06/30/5efb0cb4a0226.jpg",
        "price": 125000,
        "stock": 200,
        "UserId": 1,
        "createdAt": "2020-12-12T09:20:38.587Z",
        "updatedAt": "2020-12-12T09:20:49.098Z"
    },
    {
        "id": 2,
        "name": "nasi daging enak pokoknya",
        "image_url": "https://i0.wp.com/www.pesenmakan.id/wp-content/uploads/2020/02/makanan-enak-di-jakarta-3.jpg?resize=696%2C696&ssl=1",
        "price": 20000,
        "stock": 333,
        "UserId": 1,
        "createdAt": "2020-12-12T16:16:25.240Z",
        "updatedAt": "2020-12-12T16:16:36.714Z"
    },
    {
        "id": 4,
        "name": "Sandal Baginda",
        "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
        "price": 10000,
        "stock": 5,
        "UserId": 1,
        "createdAt": "2020-12-15T02:41:31.458Z",
        "updatedAt": "2020-12-15T02:41:50.408Z"
    },
    {
        "id": 5,
        "name": "rendang daging mantap betul",
        "image_url": "https://www.kitchensanctuary.com/wp-content/uploads/2018/01/Beef-Rendang-square-FS-28.jpg",
        "price": 30000,
        "stock": 300,
        "UserId": 1,
        "createdAt": "2020-12-18T02:45:27.504Z",
        "updatedAt": "2020-12-18T02:45:27.504Z"
    }
]
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### GET /products/:id

> find by id

_Request Header_

```
access_token : 'token string'
```

_Request Body_

```
{
  none
}
```

_Request Params_

```
{
  id : 2
}
```

_Response(200)_

```
{
    "id": 2,
    "name": "nasi daging enak pokoknya",
    "image_url": "https://i0.wp.com/www.pesenmakan.id/wp-content/uploads/2020/02/makanan-enak-di-jakarta-3.jpg?resize=696%2C696&ssl=1",
    "price": 20000,
    "stock": 333,
    "UserId": 1,
    "createdAt": "2020-12-12T16:16:25.240Z",
    "updatedAt": "2020-12-12T16:16:36.714Z"
}
```

_Response(500)_

```
{
  message : "Internal server error"
}
```

### put /products/:id

> edit product

_Request Header_

```
access_token : 'token string'
```

_Request Params_

```
id : 2
```

_Request Body_

```
{
  "name"      : "nasi kapau",
  "image_url" : "https://i0.wp.com/www.pesenmakan.id/wp-content/uploads/2020/02/makanan-enak-di-jakarta-3.jpg?resize=696%2C696&ssl=1",
  "price"     : 40000,
  "stock"     : 3000,
}
```

_Response(200)_

```
{
    "id": 2,
    "name": "nasi daging enak pokoknya",
    "image_url": "https://i0.wp.com/www.pesenmakan.id/wp-content/uploads/2020/02/makanan-enak-di-jakarta-3.jpg?resize=696%2C696&ssl=1",
    "price": 20000,
    "stock": 333,
    "UserId": 1,
    "createdAt": "2020-12-12T16:16:25.240Z",
    "updatedAt": "2020-12-12T16:16:36.714Z"
}
```

_Response(404)_

```
{
  "message": "Product not found"
}
```

_Response(401)_

```
{
  "message": "login first"
}
```

_Response(401)_

```
{
  "message": "Unauthorized"
}
```

_Response(400)_

```
{
  "message": [
    "Name is required, cannot be blank",
    "Name cannot be null",
    "ImageUrl is required, cannot be blank",
    "ImageUrl cannot be null",
    "Price is required, cannot be blank",
    "Price must be number",
    "Cannot set to minus",
    "Stock is required, cannot be blank",
    "Stock must be number",
    "Cannot set to minus",
  ]
}
```

### delete /products/:id

> delete product

_Request Header_

```
access_token : 'token string'
```

_Request Params_

```
id : 3
```

_Request Body_

```
{
  none
}
```

_Response(200)_

```
{
  "message": "Succesfully deleted"
}
```

_Response(401)_

```
{
  "message": "login first"
}
```

_Response(401)_

```
{
  "message": "Unauthorized"
}
```

### POST /cart

> create or edit a cart for customer

_Request Header_

```
access_token: 'token string'
```

_Request Body_

```
ProductId: integer
```

_Response(201)_

```
{
  "Cart": {
    "id": 11,
    "ProductId": 5,
    "UserId": 3,
    "quantity": 1,
    "Status": false,
    "updatedAt": "2020-12-18T02:58:22.117Z",
    "createdAt": "2020-12-18T02:58:22.117Z"
  }
}
```

_Response(200)_

```
{
  "Cart": {
    "id": 11,
    "ProductId": 5,
    "UserId": 3,
    "quantity": 2,
    "Status": false,
    "updatedAt": "2020-12-18T02:58:22.117Z",
    "createdAt": "2020-12-18T02:58:22.117Z"
  }
}

```

_Response(401)_

```
{
  message: 'lack of stock'
}
```

_Response(500)_

```
{
  message: 'Internal server error'
}
```

### GET /cart

> fetch all carts with status false(unpaid)

_Request Header_

```
access_token: 'string'
```

_Request Body_

```
none
```

_Response(200)_

```
{
    "data": [
        {
            "id": 2,
            "ProductId": 2,
            "UserId": 1,
            "quantity": 5,
            "Status": false,
            "createdAt": "2020-12-17T04:46:10.299Z",
            "updatedAt": "2020-12-17T05:50:24.331Z",
            "Product": {
                "id": 2,
                "name": "nasi daging enak pokoknya",
                "image_url": "https://i0.wp.com/www.pesenmakan.id/wp-content/uploads/2020/02/makanan-enak-di-jakarta-3.jpg?resize=696%2C696&ssl=1",
                "price": 20000,
                "stock": 333,
                "UserId": 1,
                "createdAt": "2020-12-12T16:16:25.240Z",
                "updatedAt": "2020-12-12T16:16:36.714Z"
            }
        },
        {
            "id": 1,
            "ProductId": 1,
            "UserId": 1,
            "quantity": 1,
            "Status": false,
            "createdAt": "2020-12-17T04:45:50.940Z",
            "updatedAt": "2020-12-17T07:07:13.826Z",
            "Product": {
                "id": 1,
                "name": "rendang rancak bana",
                "image_url": "https://asset.kompas.com/crops/gi24VPQMhftubxYIWPJATjHrxTA=/0x0:1000x667/750x500/data/photo/2020/06/30/5efb0cb4a0226.jpg",
                "price": 125000,
                "stock": 200,
                "UserId": 1,
                "createdAt": "2020-12-12T09:20:38.587Z",
                "updatedAt": "2020-12-12T09:20:49.098Z"
            }
        }
    ],
    "totalPrice": 225000
}
```

_Response(500)_

```
{
  message: 'internal server error'
}
```

### DELETE /cart/

> delete a cart for customer

_Request Header_

```
access_token: 'string'
```

_Request Body_

```
cartId
```

_Response(200)_

```
{
  message: 'remove product from cart succeed'
}
```

_Response(500)_

```
{
  message: 'Internal server error'
}
```

### POST /cart/checkout

> checkout all active cart for customer

_Request Header_

```
access_token: 'string'
```

_Request Body_

```
none
```

_Response(200)_

```
{
  message: "checkout success"
}
```

_Response(400)_

```
{
  message: "Internal server error"
}
```
