// non-relational database - MongoDB

// set character limit, type is important

const questionSchema = new mongoose.Schema({
  product_id: String,
  results: [
    {
      question_id: String, // number?
      question_body: {
        type: String, required: true, unique: true, maxLength: 1000,
      },
      question_date: String,
      asker_name: {
        type: String, required: true, unique: true, maxLength: 20,
      },
      question_helpfulness: String, // number? 1~10?
      reported: Boolean, // separate schema for reported?
    },
  ],
},
  {
    timestamps: true,
  });

const answerSchema = new mongoose.Schema({
  // number? linked to question
  question: String,
  page: Number, // number?
  count: Number, // number?
  results: [
    {
      answer_id: Number, // number?
      body: {
        type: String, required: true, unique: true, maxLength: 1000,
      },
      date: String,
      answerer_name: {
        type: String, required: true, unique: true, maxLength: 20,
      }, // character limit, required input
      helpfulness: Number, // number? set limit 1~10?
      photos: [
        {
          id: String, // number? id?
        },
    },
  ],
},
  {
    timestamps: true,
  });

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Question', answerSchema);

module.exports = { Question, Answer };

////////////////////////////////////////////////////////////////////////////////
// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.
//
// POST /qa/questions
// Adds a question for the given product
//
// PUT /qa/questions/:question_id/helpful
// Updates a question to show it was found helpful
//
// PUT /qa/questions/:question_id/report
// Updates a question to show it was reported. Note, this action
// does not delete the question, but the question will not be returned
// in the above GET request.
////////////////////////////////////////////////////////////////////////////////
// GET /qa/questions/:question_id/answers
// Returns answers for a given question. This list does not include any reported answers.
//
// POST /qa/questions/:question_id/answers
// Adds an answer for the givin question
//
// PUT /qa/answers/:answer_id/helpful
// Updates an answer to show it was found helpful
//
// PUT /qa/answers/:answer_id/report
// Updates an answer to show it has been reported. Note, this action
// does not delete the answer, but the answer will not be returned
// in the above GET request.
////////////////////////////////////////////////////////////////////////////////
