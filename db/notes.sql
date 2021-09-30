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
