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
-- select * from questions limit 10;

-- Check data is loaded into file
-- SELECT * FROM questions ORDER BY id DESC LIMIT 2;

-- add new column for converted date in questions table
-- ALTER TABLE [table_name] ADD [new_column_name] [type]
-- ALTER TABLE questions ADD question_date DATETIME;

-- In questions table, convert unix time in date_written and add to new column question_date
-- UPDATE [table_name] SET [new_column_name]=FROM_UNIXTIME([old_column_name]/1000)
-- UPDATE questions SET question_date=from_unixtime(date_written/1000);

-- add new column for converted date in answers table
-- ALTER TABLE [table_name] ADD [new_column_name] [type]
-- ALTER TABLE answers ADD newdate DATETIME;

-- In answers table, convert unix time from date_written and add to new column newdate
-- UPDATE [table_name] SET [new_column_name]=FROM_UNIXTIME([old_column_name]/1000)
-- UPDATE answers SET newdate=from_unixtime(date_written/1000);

-- Alter column names to match front end
-- ALTER TABLE [table_name] RENAME COLUMN [old_column_name] TO new_column_name
-- ALTER TABLE questions RENAME COLUMN body TO question_body
-- ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness

-- Indexing
-- ALTER TABLE [table-name] ADD INDEX [name of column] (indexing column)

-- Add indexing to questions table for product_id
-- ALTER TABLE questions ADD INDEX product_index (product_id);

-- Add indexing to questions table for id (question id)
-- ALTER TABLE questions ADD INDEX question_id_index (id);

-- Add indexing to answers table for id (question id)
-- ALTER TABLE answers ADD INDEX question_id_index (id);

-- Add indexing to answers table for answerer name
-- ALTER TABLE answers ADD INDEX answerer_name_index (answerer_name);

-- Add indexing to answers table for answerer body
-- ALTER TABLE answers ADD INDEX answerer_body_index (body);

-- Add indexing to questions table for question date
-- ALTER TABLE questions ADD INDEX question_date_index (question_date);

-- Add password to mySQL
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '[your-password-here]';

-----------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
-- SAMPLE DATA AND FORMAT FROM FIRST ROW

-- questions sample data & format
-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1

-- answers sample data & format
-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1

-- answers photos sample date & format
-- id,answer_id,url
-- 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
-- OTHER NOTES

-- alter table questions add asker_email varchar(40) not null after asker_name;

-- insert into questions table from end
-- INSERT INTO questions VALUES(1,'Was this item perhaps a good fit for you?', 'bananaleaf',);

-- show last row in questions table
-- SELECT * FROM questions ORDER BY id DESC LIMIT 5;

-- INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, helpful, reported, newdate) VALUES (1, 'Was this item perhaps a good fit for you?', UNIX_TIMESTAMP(NOW()), 'banana_boat', 'bananaboat@gmail.com', 0, 0, CURRENT_TIMESTAMP());


-- ERROR 1206 (HY000): The total number of locks exceeds the lock table size
-- SET GLOBAL innodb_buffer_pool_size=402653184;

-- show warnings limit 10; => query immediately after warning message

-- UPDATE questions SET reported=1 WHERE id=3518969;
-- UPDATE answers SET helpful=helpful+1 WHERE id=6879307;

-- SELECT * FROM questions INNER JOIN answers ON questions.id=answers.question_id WHERE questions.product_id=121295;
-- SELECT asker_name, answerer_name FROM questions INNER JOIN answers ON questions.id=answers.question_id WHERE questions.product_id=121295;
-- +----------------+----------------+
-- | asker_name     | answerer_name  |
-- +----------------+----------------+
-- | Layne_Klocko59 | Guiseppe81     |
-- | Cassie32       | Bryce.Littel   |
-- | Eldridge60     | Natalie.Doyle  |
-- | Eldridge60     | Viva55         |
-- | Eldridge60     | Pierre.Sauer62 |
-- | Karianne1      | Jacquelyn91    |
-- | Karianne1      | Veda49         |
-- | Karianne1      | Randy_Walsh    |
-- | Flavio_Batz    | Sarina14       |
-- | Flavio_Batz    | Jaqueline59    |
-- +----------------+----------------+

