var request = require('request');
var binarysearch = require('binarysearch');
var mongoose = require('mongoose');
var Search = mongoose.model('Search');
var Q = require('q');
mongoose.Promise = Q.Promise;

var exports = {
  getKeywords: getKeywords
};

module.exports = exports;
//////////

function getKeywords(req, res) {
  request(req.body.sourceURL, function (err, response, body) {
    var keywords = processKeywords(body);
    // save the 10 pair result to the DB
    new Search({keywords: keywords})
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
  var dictionary = {};
  var arr = [];
  var result = [];

  text = text.replace(/<[^>]*>/g, ""); // remove all html tags
  text = text.match(/\S+/g); // returns an array of all words based on regex

  // loop through the newly generated array of words and map to the dictionary
  for (var i = 0; i < text.length - 1; i++) {
    var first = text[i];
    var second = text[i+1];
    // check for cases such as "apple. bacon" and "apple ,bacon"
    if (!(/[^a-zA-Z\s]/g.test(first[first.length - 1]) || /[^a-zA-Z\s]/g.test(second[0]))) {
      // change ".apple bacon" to "apple bacon" and "apple bacon." to "apple bacon" im hungry now
      first = first.replace(/[^a-zA-Z]/g, "");
      second = second.replace(/[^a-zA-Z]/g, "");

      var pair = (first + " " + second).toLowerCase();
      dictionary[pair] ? dictionary[pair]++ : dictionary[pair] = 1;
    }
  }

  // convert the dictionary to a sorted array
  for (var prop in dictionary) {
    var tempPair = { pair: prop, count: dictionary[prop] };
    if (arr.length === 0) {
      arr.push(tempPair);
    } else {
      var index = binarySearch(arr, dictionary[prop]);
      arr.splice(index, 0, tempPair);
    }
  }

  // get the 10 highest, or the entire array if there are less than 10
  result = arr.length > 10 ? arr.slice(arr.length - 10, arr.length) : arr;

  return result;
}

// returns the index to insert at
function binarySearch(array, target) {
  var mid = 0;
  var hi = array.length - 1;
  while (mid <= hi) {
    var k = (hi + mid) >> 1;
    var cmp = target - array[k].count;
    if (cmp > 0) {
      mid = k + 1;
    } else if(cmp < 0) {
      hi = k - 1;
    } else {
      return k;
    }
  }
  return mid;
}