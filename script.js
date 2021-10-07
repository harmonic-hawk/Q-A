// command to run k6
// k6 run script.js

import http from 'k6/http';
import { sleep, check, group } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 1 }, // below normal load
    { duration: '10s', target: 50 }, // normal load
    { duration: '10s', target: 200 }, // normal load
    { duration: '10s', target: 400 }, // around breaking point
    { duration: '10s', target: 150 }, // beyond breaking point
    { duration: '10s', target: 20 }, // scale down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // errors are less than 1%,
    http_req_duration: ['p(95)<2000'], // 95% of requests should be under 2000
  },
};
const sleep_duration = 1;

export default function () {

  group('initial app load', () => {

    // app.get('/qa/questions/:product_id', db.getQuestions);
    // app.get('/qa/questions/:question_id/answers', db.getAnswers);

    // generate a random number for question, answer, product id
    const product_max = 1000011;
    const product_min = 1;
    const question_max = 3518969;
    const question_min = 1;
    const answer_max = 6879364;
    const answer_min = 1;

    const product_id = Math.round((Math.random() * (product_max - product_min)) + product_min);
    const question_id = Math.round((Math.random() * (question_max - question_min)) + question_min);
    const answer_id = Math.round((Math.random() * (answer_max - answer_min)) + answer_min);

    // let getQuestions = http.get(`http://localhost:5000/qa/questions/${product_id}`);
    let getQuestions = http.get(`http://localhost:5000/qa/questions?product_id=${product_id}`);
    check(getQuestions, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);

    let getAnswers = http.get(`http://localhost:5000/qa/questions/${question_id}/answers`);
    check(getAnswers, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(sleep_duration);
  })

}

  // STAGE 1
  // stages: [
  //   { duration: '5s', target: 1 }, // below normal load
  //   { duration: '10s', target: 10 }, // normal load
  //   { duration: '10s', target: 250 }, // around breaking point
  //   { duration: '10s', target: 150 }, // beyond breaking point
  //   { duration: '10s', target: 20 }, // scale down
  // ],
