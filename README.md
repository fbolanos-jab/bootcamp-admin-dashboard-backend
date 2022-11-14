# ADMIN DASHBOARD
Install Nodejs and MongoDB

Run `npm init` to install the dependencies
Serve the API with `node app.js`

## End points:

### Admin Login
POST http://localhost:3000/login

Request:
```
{
    "email":"trent@email.com",
    "password":"123456"
}
```

Response:
```
{
    "message": "successful",
    "admin": {
        "_id": "6372ba7fe50c5683ed89936d",
        "firstName": "Trent",
        "lastName": "Kimbell",
        "email": "trent@email.com",
        "password": "123456",
        "active": true,
        "__v": 0
    }
}
```

### Create admin
POST http://localhost:3000/api/admin

Request:
```
{
    "firstName": "Trent",
    "lastName": "Kimbell",
    "email": "trent@email.com",
    "password": "123456"
}
```

Response:
```
{
    "message": "New Admin created",
    "newAdmin": {
        "firstName": "Trent",
        "lastName": "Kimbell",
        "email": "trent@email.com",
        "password": "123456",
        "active": true,
        "_id": "6372ba7fe50c5683ed89936d",
        "__v": 0
    }
}
```

### Get users

GET http://localhost:3000/api/users

Response:
```
[
    {
        "_id": "6356b412afd9dc9049976651",
        "firstName": "Mario",
        "lastName": "Azurdia",
        "phone": "345345",
        "email": "mario@email.com",
        "accounts": [
            "123456789"
        ],
        "__v": 0
    }
]
```

### Create user
POST http://localhost:3000/api/users

Request:
```
{
    "firstName": "Mario",
    "lastName": "Azurdia",
    "phone": "345345",
    "email": "mario@email.com",
    "accountNumber": "123456789"
}
```

Response:
```
{
    "message": "New User created",
    "newUser": {
        "firstName": "Mario",
        "lastName": "Azurdia",
        "phone": "345345",
        "email": "mario@email.com",
        "accounts": [
            "123456789"
        ],
        "_id": "6356b412afd9dc9049976651",
        "__v": 0
    }
}
```

### Get transactions

GET http://localhost:3000/api/transactions

Response:
```
[
    {
        "_id": "6356b4c50286351bc50761b5",
        "userId": "6356b412afd9dc9049976651",
        "accountNumber": "123456789",
        "amount": "100",
        "createdAt": "2022-10-24T15:52:37.748Z",
        "updatedAt": "2022-10-24T15:52:37.748Z",
        "__v": 0
    },
    {
        "_id": "6356b4da0286351bc50761b7",
        "userId": "6356b412afd9dc9049976652",
        "accountNumber": "123456789",
        "amount": "100",
        "createdAt": "2022-10-24T15:52:58.012Z",
        "updatedAt": "2022-10-24T15:52:58.012Z",
        "__v": 0
    }
]
```

### Create transaction
POST http://localhost:3000/api/transactions

Request:
```
{
  "userId": "6356b412afd9dc9049976652",
  "amount": "100",
  "accountNumber": "123456789"
}
```

Response:
```
{
    "message": "New Transaction created",
    "newTransaction": {
        "userId": "6356b412afd9dc9049976652",
        "accountNumber": "123456789",
        "amount": "100",
        "_id": "6356b4da0286351bc50761b7",
        "createdAt": "2022-10-24T15:52:58.012Z",
        "updatedAt": "2022-10-24T15:52:58.012Z",
        "__v": 0
    }
}
```
