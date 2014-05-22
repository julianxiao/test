angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'analytics/views/map.html',
			controller: 'MapController'
		})
		.when('/analytics/', {
			templateUrl: 'analytics/views/map.html',
			controller: 'MapController'
		})
		
		.when('/map', {
			templateUrl: 'analytics/views/map.html',
			controller: 'MapController'
		})
		.when('/settings', {
			templateUrl: 'analytics/views/settings.html',
			controller: 'SettingsController'
		})

		.when('/queue', {
			templateUrl: 'analytics/views/queue.html',
			controller: 'QueueController'	
		})

		.when('/home', {
			templateUrl: 'analytics/views/home.html',
			controller: 'MainController'	
		});

	$locationProvider.html5Mode(true);

}]);