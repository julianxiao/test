angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/sa', {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		})
		
		.when('/sa.html', {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		})

		.when('/map', {
			templateUrl: 'views/map.html',
			controller: 'MapController'
		})
		.when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'SettingsController'
		})

		.when('/queue', {
			templateUrl: 'views/queue.html',
			controller: 'QueueController'	
		})

		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'	
		});

	$locationProvider.html5Mode(true);

}]);