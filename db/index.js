const mysql = require('mysql');

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
      res.status(200).json({ product_id: product_id, results: results });
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
  const photos = req.body.url;

  const query = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful, newdate) VALUES (${question_id}, '${body}', UNIX_TIMESTAMP(NOW()), '${answerer_name}', '${answerer_email}', 0, 0, CURRENT_TIMESTAMP())`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to add new answer', error);
    } else {
      console.log('added new answer');
      res.status(200).json();
    }
  })
  // access last added row in answers table for answer id if photos url length is greater than 0
  if (photos.length > 0) {
    const getAnswerId = () => {
      const answer_id_query = `SELECT id FROM answers ORDER BY id DESC LIMIT 1`;
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
      const photo_query = `INSERT INTO photos (answer_id, url) VALUES (${answer_id}, '${photos}')`;
        connection.query(photo_query, (error, results) => {
          if (error) {
            console.log('add photo fail', error);
          } else {
            console.log('added new photo');
            res.status(200).json();
          }
        })
    })
  }
}

const markQuestionAsHelpful = (req, res) => {
  const stringified_question_id = JSON.stringify(req.params);
  const id = JSON.parse(stringified_question_id);
  const question_id = id.question_id;
  const query = `UPDATE questions SET helpful=helpful+1 WHERE id=${question_id}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log('unable to mark question helpful', error);
    } else {
      console.log('mark question helpful success');
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
      console.log('mark answer helpful success');
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
