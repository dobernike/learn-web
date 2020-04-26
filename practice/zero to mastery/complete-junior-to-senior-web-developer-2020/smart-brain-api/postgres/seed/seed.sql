BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('HashHashHash124214ewfe', 'jessie@gmail.com');

COMMIT;