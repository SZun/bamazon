DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(10)  NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER(200) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;