angular.module('project', ['restangular', 'ngRoute']).
config(function($routeProvider, RestangularProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'list.html'
  }).
  when('/edit/:userId', {
    controller: EditCtrl,
    templateUrl: 'detail.html',
    resolve: {
      user: function(Restangular, $route) {
        var id = $route.current.params.userId;
        return Restangular.one('api/users', id).get();
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
  $scope.users = Restangular.all("api/users").getList().$object;
}

function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('api/users')
      .post($scope.user)
      .then(function(user) {
        $location.path('/list');
      });
  };
}


function EditCtrl($scope, $location, Restangular, user) {
  var original = user;
  $scope.user = Restangular.copy(original);

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.user.put().then(function() {
      $location.path('/');
    });
  };
}