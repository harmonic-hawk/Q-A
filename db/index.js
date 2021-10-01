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

const createQuestion = () => {

}

const createAnswer = () => {

}

const markQuestionAsHelpful = (req, res) => {
  const question_id = req.params.question_id;
  // console.log('question_id', question_id);
  res.status(200).send('mark question helpful success');
}

const reportQuestion = (req, res) => {
  const question_id = req.params.question_id;
  // console.log('question_id', question_id);
  res.status(200).send('report question success');
}

const markAnswerAsHelpful = (req, res) => {
  const answer_id = req.params.answer_id;
  // console.log('answer_id', answer_id);
  res.status(200).send('mark answer helpful success');
}

const reportAnswer = (req, res) => {
  const answer_id = req.params.answer_id;
  // console.log('answer_id', answer_id);
  res.status(200).send('report answer success');
}

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('working query - The solution is: ', results[0].solution);
// });

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
