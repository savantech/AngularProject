'use strict';

angular.
  module('angularJsApp').
  config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/admin/login");

    $stateProvider
      .state("login", {
        url: '/admin/login',
        templateUrl: 'templates/login.html',
        controller: 'loginC',
        resolve: {
          loadCtrl: function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/login.js');
          }
        }
      })
      .state("adminStructure", {
        url: "/admin",
        templateUrl: 'templates/admin-structure.html',

      })
      .state("adminStructure.adminBusiness", {
        url: '/admin-business',
        templateUrl: 'templates/admin-business.html',
        controller: 'adminBusiness',
        resolve: {
          loadCtrl: function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/adminBusiness.js');
          }
        }
      })
      .state("adminStructure.adminUser", {
        url: "/admin-user",
        templateUrl: 'templates/admin-user.html',
        controller: 'adminUser',
        resolve: {
          loadCtrl: function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/adminUser.js');
          }
        }
      })
      .state("adminStructure.adminProperties", {
        url: "/admin-properties",
        templateUrl: 'templates/admin-properties.html',
        controller: 'adminProperties',
        resolve: {
          loadCtrl: function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/adminProperties.js');
          },
        }

      })
  }
  );
