const express = require('express');
const db = require('../db');

const PORT = 5000;
const app = express();

app.use(express.json())

app.get('/qa/questions', db.getQuestions);
app.get('/qa/questions/:question_id/answers', db.getAnswers);
app.get('/loaderio-9b37345f79c476cbbb0144b1062c1df9.txt', (req, res) => {
  res.type('text/plain');
  res.send('loaderio-9b37345f79c476cbbb0144b1062c1df9');
});
app.post('/qa/questions', db.createQuestion);
app.post('/qa/questions/:question_id/answers', db.createAnswer);
app.put('/qa/questions/:question_id/helpful', db.markQuestionAsHelpful);
app.put('/qa/questions/:question_id/report', db.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', db.markAnswerAsHelpful);
app.put('/qa/answers/:answer_id/report', db.reportAnswer);


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

// :question_id => request.params
// ?question_id => request.query
// ?question_id=48432&count=5&page=1 for queries