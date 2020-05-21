var app = angular.module('app', ['ngRoute']);

const { remote } = require('electron');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: `${__dirname}/components/home/home.html`,
      controller: 'homeCtrl',
    })
    .when('/edit', {
      templateUrl: `${__dirname}/components/editImage/editImage.html`,
      controller: 'editCtrl',
    })
    .otherwise({
      template: '404',
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

app.controller('homeCtrl', function ($scope, $location) {
  $scope.pickFile = function () {
    var { dialog } = remote;
    dialog.showOpenDialog(
      {
        properties: ['openFile'],
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'jpeg', 'png'],
          },
        ],
      },
      function (file) {
        if (!!file) {
          var path = file[0];
          $location.path('/edit');
          $scope.$apply();
        }
      }
    );
  };
});
