
angular.module('project', ['restangular', 'ngRoute', 'firebase']).
config(function($routeProvider, RestangularProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'list.html'
  }).
  when('/edit/:userId', {
    controller: EditCtrl,
    templateUrl: 'detail.html'
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


function ListCtrl($scope, Restangular, $firebaseArray) {
  var ref = new Firebase(urlBase);
  $scope.items = $firebaseArray(ref);
}

function CreateCtrl($scope, $location, Restangular, $firebaseArray) {

    var ref = new Firebase(urlBase);
  var list = $firebaseArray(ref);

  $scope.save = function() {
    console.log($scope.item);
    list.$add($scope.item)
      .then(function(item) {
        $location.path('/list');
      });
  };
}


function EditCtrl($scope, $location, Restangular, $firebaseObject, $route) {
var id = $route.current.params.userId;

var ref = new Firebase(urlBase + "/" + id);
var syncObject = $firebaseObject(ref);
$scope.item = syncObject;


  $scope.destroy = function() {
    $scope.item.$remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.item.$save().then(function() {
      $location.path('/');
    });
  };
}