CREATE DATABASE discord_bot;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(32) NOT NULL,
    discriminator VARCHAR(10) NOT NULL,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY,
    message_id VARCHAR(32) UNIQUE NOT NULL,
    message VARCHAR(2000) NOT NULL,
    channel_id VARCHAR(32),
    channel VARCHAR(32),
    has_link BOOLEAN,
    profanity_count INTEGER,
    date TIMESTAMP NOT NULL,
    user_id TEXT REFERENCES users(user_id)
);