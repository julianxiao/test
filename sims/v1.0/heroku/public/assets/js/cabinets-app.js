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
        return Restangular.one('api/cabinets', id).get();
      }
    }
  }).
  when('/set/:cabinetId', {
    controller: SettingsCtrl,
    templateUrl: 'settings.html',
    resolve: {
      cabinet: function(Restangular, $route) {
        var id = $route.current.params.cabinetId;
        return Restangular.one('api/cabinets', id).get();
      }
    }
  }).  when('/new', {
    controller: CreateCtrl,
    templateUrl: 'detail.html'
  }).
  otherwise({
    redirectTo: '/'
  });

  RestangularProvider.setBaseUrl('/');


});



var pollServerForNewStatus = function() { 
  $.getJSON('/api/getDoorStatus', function(response) {

    if (response.event == 'check in' && response.reload) {

      bootbox.dialog({
        message: "<h2>Door open request received!</h2>",
        title: "Alert",
        buttons: {
          success: {
            label: "<span class='glyphicon glyphicon-bell'></span> Alarm",
            className: "btn-danger",
            callback: function() {
               window.location.reload(); 
            }
          },
          danger: {
            label: "<span class='glyphicon glyphicon-camera'></span> Camera",
            className: "btn-warning",
            callback: function() {
               window.location.reload(); 
            }
          },
          main: {
            label: "Dismiss",
            className: "btn-default",
            callback: function() {
              window.location.reload(); 
            }
          }
        }
      });

    } 

    if (response.event == 'check out' && response.reload) {
      window.location.reload();
    } 

  });
};

var timer = setInterval(pollServerForNewStatus, 2000);



function ListCtrl($scope, Restangular) {
  $scope.cabinets = Restangular.all("api/cabinets").getList().$object;
}

function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('api/cabinets')
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

function SettingsCtrl($scope, $location,  $filter, Restangular, cabinet) {
  var original = cabinet;
  $scope.cabinet = Restangular.copy(original);

  $scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');

  $scope.users = Restangular.all("api/users").getList().$object;

    $scope.save = function() {
      $location.path('/');
    }
}