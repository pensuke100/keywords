var request = require('request');
var mongoose = require('mongoose');
var Keyword = mongoose.model('Keyword');
var Q = require('q');
mongoose.Promise = Q.Promise;

var exports = {
  getKeywords: getKeywords
};

function getKeywords(req, res) {
  request(req.body.sourceURL, function (err, response, body) {
    var processed = processKeywords(body);
    console.log(processed);
    new Keyword(processed)
      .save()
      .then(function (result) {
        res.status(200).send(result);
        return result;
      })
      .catch(function (err) {
        res.status(500).send(err);
      })
  });
}

function processKeywords(text) {
  return [{pair:"ih oh", count: 1}];
}
// Company.find()
//     .sort("name")
//     .deepPopulate(["branches.location", "manager"])
//     .exec()
//     .then(function (result) {
//       res.status(200).send(result);
//       return result;
//     })
//     .catch(function (err) {
//       res.status(500).send(err);
//     });
// function create(req, res) {
//   new Company(req.body.company)
//     .save()
//     .then(function (result) {
//       res.status(200).send(result);
//       return result;
//     })
//     .catch(function (err) {
//       res.status(500).send(err);
//     });
// }

// function destroy(req, res) {
//   Company.findByIdAndRemove(req.params.id)
//     .then(function (result) {
//       res.status(200).send(result);
//       return result;
//     })
//     .catch(function (err) {
//       res.status(500).send(err);
//     });
// }

// function one(req, res) {
//   Company.findById(req.params.id)
//     .deepPopulate(["employees", "branches.location", "manager"])
//     .exec()
//     .then(function (result) {
//       res.status(200).send(result);
//       return result;
//     })
//     .catch(function (err) {
//       res.status(500).send(err);
//     });
// }

// function edit(req, res) {
//   Company.findByIdAndUpdate(req.params.id, req.body.company)
//     .exec()
//     .then(function (result) {
//       res.status(200).send(result);
//       return result;
//     })
//     .catch(function (err) {
//       res.status(500).send(err);
//     });
// }

module.exports = exports;