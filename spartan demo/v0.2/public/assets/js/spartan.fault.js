var app = angular.module('faultApp', [])
    .controller('FaultController', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {

        $scope.faultEvents = [];
        $scope.deviceList = [];
        $scope.startNumber = 0;
        $scope.deviceSelect = '';


        var ulrBase = '/api/faults?_sort=RecordTime&_order=DESC&_limit=20&_start=';

        var urlDeviceNames = '/assets/data/config.json';

        $http.get(urlDeviceNames).success(function(data, status, headers, config) {
                $scope.deviceList = data.deviceNames;
            })
            .then(function() {
                loadFaultData(ulrBase + $scope.startNumber);
            });

        function loadFaultData(url) {
            $scope.viewLoading = true;
            $http.get(url).success(function(data, status, headers, config) {
                $scope.faultEvents = data;
                $scope.viewLoading = false;
            }).
            error(function(data, status, headers, config) {
                console.log(url + ' :reading fault event data error!');
            });

        }

        $scope.changeDevice = function(deviceSelect) {
            if (deviceSelect) {
                $scope.startNumber = 0;
                loadFaultData(ulrBase + $scope.startNumber + '&DeviceName=' + deviceSelect);
            }
        };

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