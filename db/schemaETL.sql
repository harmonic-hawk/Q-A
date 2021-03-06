LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

------------------------------------------------------------------------------------------------
-- loading in ubuntu
mysql -u root

LOAD DATA LOCAL INFILE '/home/ubuntu/Q-A/qa-data/questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/ubuntu/Q-A/qa-data/answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/ubuntu/Q-A/qa-data/answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

------------------------------------------------------------------------------------------
-- SET date_written = FROM_UNIXTIME(date_written/1000)

-- LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/questions.csv' INTO TABLE questions
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- SET date_written = FROM_UNIXTIME(date_written/1000)
