#Storefront api project
# Storefront Backend Project

## Getting Started

This project contains a basic Node and Express app to get you started in constructing an API. To get started,  run `npm init` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to get started

### 1. set up node project

Install dependencies `npm install`;

### 2. set up database

- create a .env file with the following values

`POSTGRES_PASSWORD=postgres`  
`POSTGRES_HOST_AUTH_METHOD=trust`  
`POSTGRES_HOST=127.0.0.1`  
`POSTGRES_DB=shopping`  
`POSTGRES_USER=shopping_user`  
`POSTGRES_USER_PASSWORD=password123`
`POSTGRES_TEST_DB=shopping_test`  
`BCRYPT_PASSWORD=piis2021 `    
`SALT_ROUNDS=10`  
`TOKEN_SECRET=storefront`
`TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJzZWIiLCJsYXN0X25hbWUiOiJib2QiLCJwYXNzd29yZCI6ImxvbGl0byJ9LCJpYXQiOjE2MjU1MDEzMjd9.kKu84DFNxDU9NQE-Sfu8MnCyRMbhWU0HE8k4rJJjVjw`  
`ENV=dev`


`psql -h localhost -U postgres`

On the `psql` prompt do:

`CREATE USER shopping_user1 WITH PASSWORD 'password123';`  
`CREATE DATABASE shopping;`  
`CREATE DATABASE shopping_test;`  
`GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user1;`  
`GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user1;`

- create a `database.json` file with the following content:

`{
"dev": {
"driver": "pg",
"host": "127.0.0.1",
"database": "shopping",
"user": "shopping_user",
"password": "password123"
},
"test": {
"driver": "pg",
"host": "127.0.0.1",
"database": "shopping_test",
"user": "shopping_user",
"password": "password123"
}
}`

- launch the database migration to construct needed tables `db-migrate create order-products --sql-file; db-migrate create orders --sql-file; db-migrate create products --sql-file; db-migrate create users-table --sql-file `

- lauch migrattion `db-migrate up`

### 3. launch project

`npm run start` 

The backend will listen on port `3000` and postgres on port `5432`

## Testing

Before launching tests, make sure to edit your .env file and change  
`POSTGRES_DB` fom `shopping` to `shopping_test` 

This modification is needed because, at the moment, `jasmine-ts` deosn't support  
dynamic `ENV=test` 

Then launch the command `npm run test` or `npm jasmine init` or `npm run jasmine`