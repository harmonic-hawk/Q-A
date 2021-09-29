-- relational database MySQL
-- set character limit, type is important
-- import csv files
-- open mysql
-- mysql -u root -p
-- load schema to mysql
-- mysql -u root -p < schema.sql

DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
USE QA;

CREATE TABLE questions (
  id INT UNIQUE NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date TIMESTAMP NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  helpfulness INT NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

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
