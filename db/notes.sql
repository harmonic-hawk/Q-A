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


-- add new column
-- ALTER TABLE [table_name] ADD [new_column_name] [type]
-- ALTER TABLE questions ADD newdate DATETIME;

-- convert unix time from date_written to newdate
-- UPDATE [table_name] SET [new_column_name]=FROM_UNIXTIME([old_column_name]/1000)
-- UPDATE questions SET newdate=from_unixtime(date_written/1000);


-----------------------------------------------------------------------------------------
-- questions sample data & format
-- id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- 1,1,"What fabric is the top made of?",1595884714409,"yankeelover","first.last@gmail.com",0,1

-- answers sample data & format
-- id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
-- 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1

-- answers photos sample date & format
-- id,answer_id,url
-- 1,5,"https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"