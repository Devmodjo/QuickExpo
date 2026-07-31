CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY,
    email       VARCHAR(255) NOT NULL,
    full_name   VARCHAR(255),
    picture_url VARCHAR(255),
    provider    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP    NOT NULL,
    CONSTRAINT uk_users_email UNIQUE (email)
);