var app = angular.module('devicesApp', [])
    .controller('DevicesController', ['$scope', '$http', function($scope, $http) {

        $scope.deviceList = [];

        var urlDeviceNames = '/assets/data/config.json';
        var deviceNames;

        $http.get(urlDeviceNames).success(function(data, status, headers, config) {
                deviceNames = data.deviceNames;
            })
            .then(function() {
                var ulrBase = '/api/heartbeats?_sort=RecordTime&_order=DESC&_start=0&_limit=1&DeviceName=';
                for (var i = 0; i < deviceNames.length; i++) {
                    loadHeartbeatData(ulrBase + deviceNames[i]);
                }

            });

        function loadHeartbeatData(url) {
            $scope.viewLoading = true;
            $http.get(url).success(function(data, status, headers, config) {
                $scope.deviceList.push(data[0]);
                $scope.viewLoading = false;
            }).
            error(function(data, status, headers, config) {
                console.log(url + ' :reading heartbeat data error!');
            });

        }

    }]);

app.directive('myLoadingSpinner', function() {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: {
            loading: '=myLoadingSpinner'
        },
        templateUrl: 'loading.html',
        link: function(scope, element, attrs) {
            var spinner = new Spinner().spin();
            var loadingContainer = $(element).find('.my-loading-spinner-container')[0];
            loadingContainer.appendChild(spinner.el);
        }
    };
});