angular.module('project', ['restangular', 'ngRoute']).
config(function($routeProvider, RestangularProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'list.html'
  }).
  when('/edit/:cabinetId', {
    controller: EditCtrl,
    templateUrl: 'detail.html',
    resolve: {
      cabinet: function(Restangular, $route) {
        var id = $route.current.params.cabinetId;
        return Restangular.one('cabinets', id).get();
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

  RestangularProvider.setBaseUrl('http://localhost:3000/');


});



var pollServerForNewStatus = function() { 
  $.getJSON('/api/getDoorStatus', function(response) {

    if (response.event == 'check in' && response.reload) {
      bootbox.alert("Door opened!", function() {
  window.location.reload(); 
});
      

    } 

    if (response.event == 'check out' && response.reload) {
      window.location.reload();
    } 

  });
};

var timer = setInterval(pollServerForNewStatus, 2000);



function ListCtrl($scope, Restangular) {
  $scope.cabinets = Restangular.all("cabinets").getList().$object;
}

function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('cabinets')
      .post($scope.cabinet)
      .then(function(cabinet) {
        $location.path('/list');
      });
  };
}


function EditCtrl($scope, $location, Restangular, cabinet) {
  var original = cabinet;
  $scope.cabinet = Restangular.copy(original);

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.cabinet.put().then(function() {
      $location.path('/');
    });
  };
}