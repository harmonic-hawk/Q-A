-- relational database MySQL
-- start mysql
-- mysql -u root -p
-- load schema to mysql
-- mysql -u root -p < schema.sql
-- show databases;
-- use qa;
-- show tables;
-- describe questions/answers/photos;
-- select * from questions/answers/photos;
-- select * from questions limit 3;
-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1
-- add new column for date
-- ALTER TABLE questions ADD newdate DATETIME;
-- convert unix time from date_written to newdate
-- update questions set newdate=from_unixtime(date_written/1000);

DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
USE QA;

CREATE TABLE questions (
  id INT UNIQUE NOT NULL,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written  BIGINT NOT NULL,
  asker_name VARCHAR(30) NOT NULL,
  helpful INT NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1

CREATE TABLE answers (
  id INT UNIQUE NOT NULL,
  question_id INT UNIQUE NOT NULL,
  page INT NOT NULL,
  count INT NOT NULL,
  body VARCHAR(500) NOT NULL,
  date TIMESTAMP NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  helpfulness INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE photos (
  id INT UNIQUE NOT NULL,
  answer_id INT UNIQUE NOT NULL,
  url VARCHAR(2048) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);
