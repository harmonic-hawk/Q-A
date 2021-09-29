const axios = require('axios');
const TOKEN = require('./config.js');

module.exports = {
  getProducts: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/products',
      method: 'get',
      params: {
        page: req.query.page || 1,
        count: req.query.count || 100,
      },
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getProductInfo: (req, res) => {
    const id = req.params.product_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/products/${id}`,
      method: 'get',
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getProductStyles: (req, res) => {
    const id = req.params.product_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/products/${id}/styles`,
      method: 'get',
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getRelatedProducts: (req, res) => {
    const id = req.params.product_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/products/${id}/related`,
      method: 'get',
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getReviews: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/reviews',
      method: 'get',
      params: {
        page: req.query.page || 1,
        count: req.query.count || 5,
        sort: req.query.sort || 'relevant',
        product_id: req.query.product_id,
      },
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getReviewsMeta: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/reviews/meta',
      method: 'get',
      params: { product_id: req.query.product_id },
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  createReview: (req, res) => {
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/reviews',
      method: 'post',
      data: {
        product_id: req.body.product_id,
        rating: req.body.rating,
        summary: req.body.summary,
        body: req.body.body,
        recommend: req.body.recommend,
        name: req.body.name,
        email: req.body.email,
        photos: req.body.photos,
        characteristics: req.body.characteristics || {},
      },
    };
    axios.request(options)
      .then(() => {
        res.status(201).send('Review Posted!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  markReviewHelpful: (req, res) => {
    const id = req.params.review_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/reviews/${id}/helpful`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Marked Helpful!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  reportReview: (req, res) => {
    const id = req.params.review_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/reviews/${id}/report`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Review Reported!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getQuestions: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/qa/questions',
      method: 'get',
      params: {
        page: req.query.page,
        count: req.query.count,
        product_id: req.query.product_id,
      },
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getAnswers: (req, res) => {
    // console.log(req.params)
    const id = req.params.question_id;
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/questions/${id}/answers`,
      method: 'get',
      params: {
        page: req.query.page,
        count: req.query.count,
      },
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  createQuestion: (req, res) => {
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/qa/questions',
      method: 'post',
      data: {
        product_id: req.body.product_id,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
      },
    };
    axios.request(options)
      .then(() => {
        res.status(201).send('Question Posted!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  createAnswer: (req, res) => {
    const id = req.params.question_id;
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/questions/${id}/answers`,
      method: 'post',
      data: {
        name: req.body.name,
        email: req.body.email,
        body: req.body.body,
        photos: req.body.photos,
      },
    };
    axios.request(options)
      .then(() => {
        res.status(201).send('Answer Posted!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  markQuestionAsHelpful: (req, res) => {
    const id = req.params.question_id;
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/questions/${id}/helpful`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Question marked as helpful!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  reportQuestion: (req, res) => {
    const id = req.params.question_id;
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/questions/${id}/report`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Question reported!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  markAnswerAsHelpful: (req, res) => {
    const id = req.params.answer_id;
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/answers/${id}/helpful`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Answer marked as helpful!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  reportAnswer: (req, res) => {
    const id = req.params.answer_id;
    const options = {
      headers: {
        Authorization: TOKEN,
      },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: `/qa/answers/${id}/report`,
      method: 'put',
    };
    axios.request(options)
      .then(() => {
        res.status(204).send('Answer reported!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  getCart: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/cart',
      method: 'get',
    };
    axios.request(options)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
  addToCart: (req, res) => {
    const options = {
      headers: { Authorization: TOKEN },
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo',
      url: '/cart',
      method: 'post',
      data: {
        sku_id: req.body.sku_id,
      },
    };
    axios.request(options)
      .then(() => {
        res.status(201).send('Item added to cart!');
      })
      .catch((err) => {
        res.status(500).send(err.response.data);
      });
  },
};
