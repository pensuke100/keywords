(function () {
  'use strict';

  angular
    .module('app')
    .factory('keywordsFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      getKeywords: getKeywords
    };

    return factory;
    //////////

    function getKeywords(payload) {
      return $http.post('/keywords', payload);
    }
  }
})();