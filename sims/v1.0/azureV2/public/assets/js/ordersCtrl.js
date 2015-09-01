var urlBase = 'https://ebams.firebaseio.com/orders';


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

function CreateCtrl($scope, $location, Restangular, $firebaseArray, $http) {

	var ref = new Firebase(urlBase);
	var list = $firebaseArray(ref);

	var refUser = new Firebase('https://ebams.firebaseio.com/users');
	$scope.users = $firebaseArray(refUser);

	var refAssets = new Firebase('https://ebams.firebaseio.com/assets');
	$scope.assets = $firebaseArray(refAssets);

	$scope.item = {
		'user': null,
		'asset': null,
		'createdAt': Firebase.ServerValue.TIMESTAMP
	};

//	var myEl = angular.element( document.querySelector( '#time' ) );

//	myEl.value = moment().format();

	$scope.save = function() {
		list.$add($scope.item)
			.then(function(item) {

				bootbox.confirm("Send work order now?", function(result) {
					if (result) {
						var url = "/api/sms?phonenumber=" + $scope.item.user.phone;
						$http.get(url).then(function() {
							$location.path('/');
						});
					}
				});
				$location.path('/list');
			});
	};


}


function EditCtrl($scope, $location, Restangular, $firebaseObject, $firebaseArray, $route, $http) {
	var id = $route.current.params.userId;

	var ref = new Firebase(urlBase + "/" + id);
	var syncObject = $firebaseObject(ref);
	$scope.item = syncObject;


	var refUser = new Firebase('https://ebams.firebaseio.com/users');
	$scope.users = $firebaseArray(refUser);

	var refAssets = new Firebase('https://ebams.firebaseio.com/assets');
	$scope.assets = $firebaseArray(refAssets);


	$scope.destroy = function() {
		$scope.item.$remove().then(function() {
			$location.path('/list');
		});
	};

	$scope.save = function() {
		$scope.item.$save().then(function() {
			$location.path('/list');
		});
	};

	$scope.message = function() {
		var url = "/api/sms?phonenumber=" + $scope.item.user.phone;
		$http.get(url).then(function() {
			$location.path('/list');
		});
	};
}