const express = require('express');
const db = require('../db');
// console.log(db);

const PORT = 5000;
const app = express();

app.use(express.json())

app.get('/qa/questions/:product_id', db.getQuestions);
app.get('/qa/questions/:question_id/answers', db.getAnswers);
app.post('/qa/questions', db.createQuestion);
app.post('/qa/answers', db.createAnswer);
app.put('/qa/questions/:question_id/helpful', db.markQuestionAsHelpful);
app.put('qa/questions/:question_id/report', db.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', db.markAnswerAsHelpful);
app.put('qa/answers/:answer_id/report', db.reportAnswer);


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
