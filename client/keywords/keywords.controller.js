(function () {
  'use strict';

  angular
    .module('app')
    .controller('KeywordsController', controller);

  controller.$inject = [
    "$log",
    "keywordsFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    keywordsFactory,
    toastrFactory
  ) {
    var vm = this;

    vm.getKeywords = getKeywords;

    initialize();
    //////////

    function initialize() {
    }

    function getKeywords(isValid) {
      if (isValid) {
        var payload = {
          sourceURL: vm.sourceURL
        };

        keywordsFactory.getKeywords(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        vm.keywords = res.data.keywords;
        vm.sourceURL = '';
        toastrFactory.success("Success!");
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Keywords Controller XHR Failed: ', err);
    }
  }
})();