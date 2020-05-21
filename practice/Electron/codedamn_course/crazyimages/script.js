var app = angular.module('app', ['ngRoute']);

const { remote } = require('electron');

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: `${__dirname}/components/home/home.html`,
    controller: 'homeCtrl',
  });
});

app.controller('headCtrl', function ($scope) {
  var win = remote.getCurrentWindow();

  $scope.close = function () {
    win.close();
  };
  $scope.maximize = function () {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  };
  $scope.minimize = function () {
    win.minimize();
  };
});

app.controller('homeCtrl', function ($scope) {});
