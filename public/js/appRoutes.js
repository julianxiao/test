angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/sa', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		
		.when('/sa.html', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
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
		});

	$locationProvider.html5Mode(true);

}]);