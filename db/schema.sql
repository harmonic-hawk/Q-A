DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
USE QA;

-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1

CREATE TABLE IF NOT EXISTS  questions (
  id INT UNIQUE NOT NULL,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  -- date_written DATETIME,
  asker_name VARCHAR(30) NOT NULL,
  helpful INT NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1

-- ERROR 1206 (HY000): The total number of locks exceeds the lock table size
-- SET GLOBAL innodb_buffer_pool_size=402653184;

-- show warnings limit 10; => query immediately after warning message

CREATE TABLE IF NOT EXISTS answers (
  id INT UNIQUE NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(500) NOT NULL,
  date_written BIGINT NOT NULL,
  -- date_written DATETIME,
  answerer_name VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  -- page INT NOT NULL,
  -- count INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

-- id,answer_id,url
-- 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"

CREATE TABLE IF NOT EXISTS photos (
  id INT UNIQUE NOT NULL,
  answer_id INT NOT NULL,
  url VARCHAR(2048) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);
