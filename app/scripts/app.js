'use strict';

/**
 * @ngdoc overview
 * @name zoteroaccessApp
 * @description
 * # zoteroaccessApp
 *
 * Main module of the application.
 */
angular
  .module('zoteroaccessApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
