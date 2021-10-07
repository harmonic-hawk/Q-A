const mysql = require('mysql');
const parseQuestions = require('./parseQuestions.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'qa'
});

connection.connect((err) => {
  if (err) {
    console.log('error connection: ' + err.stack);
    return;
  } else {
    console.log('Connected to MySQL')
  }
});

// reported currently not included in query
// product_id hardcoded on the frontend
// questions won't show with addition of reported
const getQuestions = (req, res) => {
  const product_id = req.query.product_id;
  const count = req.query.count || 2;
  const page = req.query.page || 1;

  const query = `
    SELECT
      question_id,
      question_body,
      question_date,
      asker_name,
      question_helpfulness,
    JSON_OBJECTAGG(
      answers.id,
        JSON_OBJECT(
          'id', answers.id,
          'body', answers.body,
          'date', answers.newdate,
          'answerer_name', answers.answerer_name,
          'helpfulness', answers.helpful
          ))
    AS answers
    FROM
      questions
    INNER JOIN
      answers
    ON
      questions.id=answers.question_id
    WHERE
      questions.product_id=${product_id}
    GROUP BY
      questions.id`;

  connection.query(query, [product_id, count, page], (error, results) => {
    if (error) {
      console.log('unable to select all questions', error);
    } else {
      // change answers value to an object
      res.status(200).json({ product_id: product_id, results: parsedQuestions(results) });
      console.log('able to select all questions');
    }
  })
}

const getAnswers = (req, res) => {
  const question_id = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const query = `
    SELECT
      id AS answer_id,
      body,
      newdate AS date,
      answerer_name,
      helpful AS helpfulness
    FROM
      answers
    WHERE
      question_id=${question_id}`;
  connection.query(query, [question_id, count, page], (error, results) => {
    if (error) {
      console.log('unable to select all answers', error);
    } else {
      res.status(200).json({
        'question': question_id,
        'page': page,
        'count': count,
        'results': results
      });
      console.log('selected all answers');
    }
  })
}

// front end currently has product_id hardcoded as 48436
// create question should handle adding question to
// current product when frontend is refactored to pass
// down the current pages product_id
const createQuestion = (req, res) => {
  const product_id = req.body.product_id;
  const body = req.body.body;
  const asker_name = req.body.name;
  const asker_email = req.body.email;
  const query = `
    INSERT INTO
      questions (
        product_id,
        question_body,
        date_written,
        asker_name,
        asker_email,
        question_helpfulness,
        reported,
        question_date
      )
    VALUES (
      ${product_id},
      '${body}',
      UNIX_TIMESTAMP(NOW()),
      '${asker_name}',
      '${asker_email}',
      0,
      0,
      CURRENT_TIMESTAMP())`;
    connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to add new question', error);
    } else {
      console.log('added new question');
      res.status(200).json(results);
    }
  })
}

const createAnswer = (req, res) => {
  const question_id = req.params.question_id;
  const body = req.body.body;
  const answerer_name = req.body.name;
  const answerer_email = req.body.email;
  const photos = req.body.photos;

  const query = `
    INSERT INTO
      answers (
        question_id,
        body,
        date_written,
        answerer_name,
        answerer_email,
        reported,
        helpful,
        newdate
      )
    VALUES (
      ${question_id},
      '${body}',
      UNIX_TIMESTAMP(NOW()),
      '${answerer_name}',
      '${answerer_email}',
      0,
      0,
      CURRENT_TIMESTAMP())`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to add new answer', error);
    } else {
      console.log('added new answer');
      res.status(200).json();
    }
  })

  // access last added row in answers table for answer id if photos url length is greater than 0
  const getAnswerId = () => {
    const answer_id_query = `
      SELECT
        id
      FROM
        answers
      ORDER BY
        id
      DESC LIMIT
        1`;
    return new Promise((resolve, reject) => {
      connection.query(answer_id_query, (error, data) => {
        const stringified_answer_id = JSON.stringify(data[0]);
        const id = JSON.parse(stringified_answer_id);
        const answer_id = id.id;
        if (error) {
          return reject(error)
        };
        resolve(answer_id)
      })
    })
  }
  getAnswerId().then(answer_id => {
    for (let i = 0; i < photos.length; i++) {
      const photo_query = `
        INSERT INTO
          photos (
            answer_id,
            url
          )
        VALUES (
          ${answer_id},
          '${photos[i]}'
        )`;
      connection.query(photo_query, (error, results) => {
        if (error) {
          console.log('add photo fail', error);
        } else {
          console.log('added new photo');
          res.status(200).json();
        }
      })
    }
  })
}

const markQuestionAsHelpful = (req, res) => {
  const stringified_question_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_question_id);
  const question_id = id.question_id;
  const query = `UPDATE questions SET question_helpfulness=question_helpfulness+1 WHERE id=${question_id}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to mark question helpful', error);
    } else {
      console.log('marked question helpful');
      res.status(200).json(results);
    }
  })
}

const reportQuestion = (req, res) => {
  const stringified_question_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_question_id);
  const question_id = id.question_id;
  const query = `UPDATE questions SET reported=1 WHERE id=${question_id}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to report question', error);
    } else {
      console.log('question reported');
      res.status(200).json(results);
    }
  })
}

const markAnswerAsHelpful = (req, res) => {
  const stringified_answer_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_answer_id);
  const answer_id = id.answer_id;
  const query = `UPDATE answers SET helpful=helpful+1 WHERE id=${answer_id}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to mark answer helpful', error);
    } else {
      console.log('marked answer helpful');
      res.status(200).json(results);
    }
  })
}

const reportAnswer = (req, res) => {
  const stringified_answer_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_answer_id);
  const answer_id = id.answer_id;
  const query = `UPDATE answers SET reported=1 WHERE id=${answer_id}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to report answer', error);
    } else {
      console.log('answer reported');
      res.status(200).json(results);
    }
  })
}

module.exports = {
  getQuestions,
  getAnswers,
  createQuestion,
  createAnswer,
  markQuestionAsHelpful,
  reportQuestion,
  markAnswerAsHelpful,
  reportAnswer
};
