CREATE TABLE movies (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(200) NOT NULL,
	url VARCHAR(300),
	userID INT NOT NULL
);

INSERT INTO movies (title, url, userID) VALUES ('Silence of the Lambs', 'test', 12345);

SELECT * FROM movies ORDER BY title ASC
