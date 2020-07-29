CREATE DATABASE discord_bot;

CREATE TABLE users
(
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    discriminator VARCHAR(10) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE messages
(
    message_id SERIAL NOT NULL PRIMARY KEY,
    message VARCHAR(2000) NOT NULL,
    channel VARCHAR(32),
    has_link BOOLEAN,
    amount_curse INTEGER,
    date TIMESTAMP NOT NULL,
    user_id INTEGER REFERENCES users(user_id)
);
