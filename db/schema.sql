-- data modelling
-- define the schema of the database
-- SQL

CREATE DATABASE goodfoodhunting;


CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT
);

-- seeding

INSERT INTO dishes (title, description, image_url)
VALUES ('cake', 'yummy yummy cake', 'https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg');

INSERT INTO dishes (title, description, image_url)
VALUES ('pancakes', 'it''s time for some pancakes', 'https://fakeimg.pl/600x600');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password_digest TEXT
);

-- cant do this anymore!!!!
INSERT INTO users (email, password_digest) VALUES ('dt@ga.co', 'pudding');

-- we need to add user_id column to the dishes table
ALTER TABLE dishes ADD COLUMN user_id INTEGER;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  user_id INTEGER NOT NULL,
  dish_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (dish_id) REFERENCES dishes (id) ON DELETE CASCADE
);
