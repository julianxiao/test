angular.module('project', ['restangular', 'ngRoute']).
config(function($routeProvider, RestangularProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'list.html'
  }).
  when('/edit/:logItemId', {
    controller: EditCtrl,
    templateUrl: 'detail.html',
    resolve: {
      logItem: function(Restangular, $route) {
        var id = $route.current.params.logItemId;
        return Restangular.one('api/logItems', id).get();
      }
    }
  }).
  when('/new', {
    controller: CreateCtrl,
    templateUrl: 'detail.html'
  }).
  otherwise({
    redirectTo: '/'
  });

  RestangularProvider.setBaseUrl('/');


});



function ListCtrl($scope, Restangular) {
  $scope.logItems = Restangular.all("api/logItems?_sort=timeStamp&_order=DESC").getList().$object;
}



function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('api/logItems')
      .post($scope.logItem)
      .then(function(logItem) {
        $location.path('/list');
      });
  };
}

function EditCtrl($scope, $location, Restangular, logItem) {
  var original = logItem;
  $scope.logItem = Restangular.copy(original);

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    bootbox.alert("Dummy function here ...");
  };
}