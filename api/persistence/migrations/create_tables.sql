CREATE TABLE  IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE  IF NOT EXISTS restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE  IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    rating int NOT NULL,
    restaurant_id int NOT NULL,
    user_id int NOT NULL,
    
    CONSTRAINT fk_rev_restaurant_id FOREIGN KEY (restaurant_id)
    REFERENCES restaurants (restaurant_id)
    ON DELETE CASCADE,
    
    CONSTRAINT fk_rev_user_id FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE CASCADE
);