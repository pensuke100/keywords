(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$routeProvider'
  ];

  function routes($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'keywords/keywords.html',
        controller: 'KeywordsController',
        controllerAs: 'vm'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  }
})();