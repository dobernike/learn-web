BEGIN TRANSACTION;

INSERT INTO users (name, email, age, pet, entries, joined) VALUES ('a', 'a@a.com', 25, 'dog',  5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$B0l88Dey1mQlZnFmnPAppOmUni..g3B9Tmb6ms/My3w7dof2LrEna', 'a@a.com');

COMMIT;