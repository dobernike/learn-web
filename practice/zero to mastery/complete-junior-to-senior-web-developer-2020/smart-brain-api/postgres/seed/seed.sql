BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('a', 'a@a.com', 5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$B0l88Dey1mQlZnFmnPAppOmUni..g3B9Tmb6ms/My3w7dof2LrEna', 'a@a.com');

COMMIT;