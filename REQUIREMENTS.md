# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index route : `/products [GET]`
- Show route : `/products/:id [GET]`
- Create route : `/products [POST]` [token required]

#### Users
- Index route: `/users [GET]` [token required]
- Show route: `/users/:id [GET]` [token required]
- Create route: `/users [POST]` [token required]

#### Orders
- Index route: `/orders [GET]` [token required]
- Show route: `/orders/:id [GET]` [token required]
- Create route: `/orders [POST]` [token required]
- current_orders_by_user route: `/current_orders_by_user/:id`[token required]

## Data Shapes
#### Product
`CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(120) NOT NULL,
    price integer NOT NULL, 
    category VARCHAR(120)
);`

#### User
`CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(120) NOT NULL,
    last_name VARCHAR(120) NOT NULL,
    password_digest VARCHAR(255), 
    token VARCHAR(255),
);`

#### Orders
`CREATE TABLE ORDERS (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(64) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
);`

#### Join table Orders / Products

`CREATE TABLE order_products (
    id SERIAL PRIMARY KEY, 
    quantity INTEGER NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL
);`

