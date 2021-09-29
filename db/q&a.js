// non-relational database - MongoDB

// set character limit, type

const questionSchema = new mongoose.Schema({
  product_id: String,
  results: [
    {
      question_id: String,
      question_body: {
        type: String, required: true, unique: true, maxLength: 1000,
      },
      question_date: String,
      asker_name: {
        type: String, required: true, unique: true, maxLength: 20,
      },
      question_helpfulness: String,
      reported: Boolean,
    },
  ],
  answer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
  {
    timestamps: true,
  };
})

const answerSchema = new mongoose.Schema({
  question: String,
  page: Number,
  count: Number,
  results: [
    {
      answer_id: Number,
      body: {
        type: String, required: true, unique: true, maxLength: 1000,
      },
      date: String,
      answerer_name: {
        type: String, required: true, unique: true, maxLength: 20,
      },
      helpfulness: Number,
      photos: [
        {
          id: String,
        },
      },
     },
   ],
   photo_id: {
     type: Schema.Types.ObjectId,
     ref: 'Photo'
   },
  {
    timestamps: true,
  }};
)

const photoSchema = new mongoose.Schema({
  id: Number,
  url: String,
  // thumbnail url
})

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Photo = mongoose.model('Photo', photoSchema);

module.exports = { Question, Answer, Photo };

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
