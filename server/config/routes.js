var keywords = require('../controllers/keywords.js');

module.exports = function (app) {
  app.post('/keywords',
    function (req, res){
      keywords.getKeywords(req, res);
    });
};