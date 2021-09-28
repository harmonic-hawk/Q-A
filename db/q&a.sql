-- relational database MySQL

-- set character limit, type is important

CREATE TABLE products (
  id INT UNIQUE NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE questions (
  id INT UNIQUE NOT NULL,
  body VARCHAR(1000) NOT NULL,
  -- 2018-01-04T00:00:00.000Z
  date TIMESTAMP NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  helpfulness INT NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id)
    REFERENCES products (id)
)

CREATE TABLE answers (
  id INT UNIQUE NOT NULL,
  page INT NOT NULL,
  count INT NOT NULL,
  body VARCHAR(500) NOT NULL,
  -- 2018-01-04T00:00:00.000Z
  date TIMESTAMP NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  helpfulness INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id)
    REFERENCES questions (id)
)

CREATE TABLE photos (
  id INT UNIQUE NOT NULL,
  url VARCHAR(300) NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (answer_id)
    REFERENCES answers (id)
)

-------------------------------------------------------------------------------
-- GET /qa/questions
-- Retrieves a list of questions for a particular product.
-- This list does not include any reported questions.
--
-- POST /qa/questions
-- Adds a question for the given product
--
-- PUT /qa/questions/:question_id/helpful
-- Updates a question to show it was found helpful
--
-- PUT /qa/questions/:question_id/report
-- Updates a question to show it was reported. Note, this action
-- does not delete the question, but the question will not be returned
-- in the above GET request.
-------------------------------------------------------------------------------
-- GET /qa/questions/:question_id/answers
-- Returns answers for a given question. This list does not include any reported answers.
--
-- POST /qa/questions/:question_id/answers
-- Adds an answer for the givin question
--
-- PUT /qa/answers/:answer_id/helpful
-- Updates an answer to show it was found helpful
--
-- PUT /qa/answers/:answer_id/report
-- Updates an answer to show it has been reported. Note, this action
-- does not delete the answer, but the answer will not be returned
-- in the above GET request.
-------------------------------------------------------------------------------
