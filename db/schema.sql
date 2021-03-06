-- DROP DATABASE IF EXISTS qa;
-- CREATE DATABASE qa;
USE QA;

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  -- date_written DATETIME,
  asker_name VARCHAR(30) NOT NULL,
  asker_email VARCHAR(40) NOT NULL,
  helpful INT NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS answers (
  id INT AUTO_INCREMENT NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(500) NOT NULL,
  date_written BIGINT NOT NULL,
  -- date_written DATETIME,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(40) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  -- page INT NOT NULL,
  -- count INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT NOT NULL,
  answer_id INT NOT NULL,
  url VARCHAR(2048) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);

