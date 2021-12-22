/* Replace with your SQL commands */

CREATE TABLE orders (
    ID SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);