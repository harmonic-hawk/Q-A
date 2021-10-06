const parsedQuestions = (questions) => {
  // iterate through all the questions and parse answers
  var parsedQuestions = questions.map((question) => {
    // set answers to be the parsed object
    question.answers = JSON.parse(question.answers);
    return question;
  })
  return parsedQuestions;
}

module.exports = parsedQuestions;
