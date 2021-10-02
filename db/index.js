const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'qa'
});

connection.connect((err) => {
  if (err) {
    console.log('error connection: ' + err.stack);
    return;
  } else {
    console.log('Connected to MySQL')
  }
})

const getQuestions = (req, res) => {
  const product_id = req.params.product_id;
  console.log('req.params', req.params)
  console.log('req.params.product_id', req.params.product_id)
  const count = req.query.count;
  const page = req.query.page;
  const query = `SELECT id, product_id, body, new_date_time, asker_name, helpful, reported FROM questions WHERE product_id=${product_id} LIMIT 1`;
  connection.query(query, [product_id, count, page], (error, results) => {
    console.log(results);
    if (error) {
      console.log('unable to select all questions', error);
    } else {
      res.status(200).json({product_id: product_id, results: results});
      console.log('able to select all questions');
    }
  })
}

const getAnswers = (req, res) => {
  const question_id = req.params.question_id;
  const count = req.query.count;
  const page = req.query.page;
  const query = `SELECT id, question_id, body, new_date_time, answerer_name, helpful, reported FROM answers WHERE question_id=${question_id} LIMIT 1`;
  connection.query(query, [question_id, count, page], (error, results) => {
    console.log(results);
    if (error) {
      console.log('unable to select all questions', error);
    } else {
      res.status(200).json(results);
      console.log('able to select all questions');
    }
  })
}

const createQuestion = (req, res) => {
  const product_id = req.body.product_id;
  const body = req.body.body;
  const asker_name = req.body.asker_name;
  const asker_email = req.body.asker_email;
  const query = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, helpful, reported, newdate) VALUES (${product_id}, '${body}', UNIX_TIMESTAMP(NOW()), '${asker_name}', '${asker_email}', 0, 0, CURRENT_TIMESTAMP())`;
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
  const stringified_question_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_question_id);
  const question_id = id.question_id;
  const body = req.body.body;
  const answerer_name = req.body.answerer_name;
  const answerer_email = req.body.answerer_email;
  // const photos = req.body.photos;
  const query = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful, newdate) VALUES (${question_id}, '${body}', UNIX_TIMESTAMP(NOW()), '${answerer_name}', '${answerer_email}', 0, 0, CURRENT_TIMESTAMP())`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to add new answer', error);
    } else {
      console.log('added new answer');
      res.status(200).json(results);
    }
  })
}

const markQuestionAsHelpful = (req, res) => {
  const question_id = req.params.question_id;
  // console.log('question_id', question_id);
  const query = 'UPDATE '
  res.status(200).send('mark question helpful success');
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
  const answer_id = req.params.answer_id;
  // console.log('answer_id', answer_id);
  res.status(200).send('mark answer helpful success');
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
