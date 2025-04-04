CREATE DATABASE IF NOT EXISTS controlgastosdb;

use controlgastosdb;

CREATE TABLE user(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO user VALUES
    (1, 'Joe', 1000),
    (2, 'Henry', 2000);