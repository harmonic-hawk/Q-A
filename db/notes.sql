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


-- mysql> INSERT INTO questions VALUES(1,'bananaleaf', 'bananaleaf@gmail.com', 'Was this item perhaps a good fit for you?');
-- ERROR 1136 (21S01): Column count doesn't match value count at row 1
-- mysql> select * from questions order by id desc limit 2;


-- add new column
-- ALTER TABLE [table_name] ADD [new_column_name] [type]
-- ALTER TABLE questions ADD newdate DATETIME;

-- ALTER TABLE answers ADD newdate DATETIME;


-- convert unix time from date_written to newdate
-- UPDATE [table_name] SET [new_column_name]=FROM_UNIXTIME([old_column_name]/1000)
-- UPDATE questions SET newdate=from_unixtime(date_written/1000);

-- UPDATE answers SET newdate=from_unixtime(date_written/1000);


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


-- alter table questions add asker_email varchar(40) not null after asker_name;

-- insert into questions table from end
-- INSERT INTO questions VALUES(1,'Was this item perhaps a good fit for you?', 'bananaleaf',);

-- show last row in questions table
-- SELECT * FROM questions ORDER BY id DESC LIMIT 1;

INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, helpful, reported, newdate) VALUES (1, 'Was this item perhaps a good fit for you?', UNIX_TIMESTAMP(NOW()), 'banana_boat', 'bananaboat@gmail.com', 0, 0, CURRENT_TIMESTAMP());


-- ERROR 1206 (HY000): The total number of locks exceeds the lock table size
-- SET GLOBAL innodb_buffer_pool_size=402653184;

-- show warnings limit 10; => query immediately after warning message