-- /Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/questions.csv

LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- needs revision
LOAD DATA LOCAL INFILE '/Users/robinjeng/Downloads/hr-sfo137-project-catwalk-qa/Q-A/q&a-data/questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
SET date_written = FROM_UNIXTIME(@date_written/1000);