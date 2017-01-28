CREATE TABLE Article (

	Id_A INT auto_increment primary key,
	time DATETIME NOT NULL,
	title CHAR(255) NOT NULL,
	des  CHAR(255) NOT NULL,
	keyword CHAR(255) NOT NULL,
	path CHAR(255) NOT NULL

);

DELETE FROM Article WHERE Id_A=1;

SELECT * FROM Article;

INSERT INTO Article (title, time, des, keyword, path) VALUES ("Test Article", NOW(), "这是一篇测试文本", "test", "/Test Article.md");
