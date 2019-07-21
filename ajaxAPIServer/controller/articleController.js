const articleModel = require('../model/article.js');

const articleController = {
  getArticle: function (req, res) {
    articleModel.getArticle((err, data) => {
      let result = {
        code: 200,
        data
      }
      if (err) {
        result = {
          code: 500,
          msg: '服务器错误'
        }
      }
      res.send(result);
    })
  },
  getSearchArticle: function (req, res) {
    articleModel.getSearchArticle(req.query.search, (err, data) => {
      let result = {
        code: 200,
        data
      }
      if (err) {
        result = {
          code: 500,
          msg: '服务器错误'
        }
      }
      res.send(result);
    })
  }
}
module.exports = articleController;