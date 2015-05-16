var app = angular.module('heartbeatApp', [])
    .controller('HeartbeatController', ['$scope', '$http', function($scope, $http) {

        $scope.heartbeats = [];
        $scope.deviceList = [];

        var offset = 0;
        var deviceSelected = '';
        var dateSelected = '';

        var ulrBase = '/api/heartbeats?_sort=RecordTime&_order=DESC&_limit=20&_start=';
        var ulrConfig = '/assets/data/config.json';

        $http.get(ulrConfig).success(function(data, status, headers, config) {
                $scope.deviceList = data.deviceNames;
            })
            .then(function() {
                loadHeartbeatData(ulrBase + offset);
            });

        function loadHeartbeatData(url) {
            $scope.viewLoading = true;
            $http.get(url).success(function(data, status, headers, config) {
                $scope.heartbeats = data;
                $scope.viewLoading = false;
            }).
            error(function(data, status, headers, config) {
                console.log(url + ' :reading heartbeat event data error!');
            });
        }

        function loadHeartbeatDataUrl() {
            var url = ulrBase + offset;
            if (deviceSelected) {
                url = url + '&DeviceName=' + deviceSelected;
            }

            if (dateSelected) {
                url = url + '&Date=' + dateSelected;
            }

            loadHeartbeatData(url);

        }

        $scope.changeDevice = function(selectValue) {
            offset = 0;
            deviceSelected = selectValue;
            loadHeartbeatDataUrl();
        };

        $scope.changeDate = function(selectedDate) {
            offset = 0;
            dateSelected = moment(selectedDate).format('YYYY-MM-DD');
            loadHeartbeatDataUrl();
        };

        $scope.loadNext = function() {
            offset += 20;
            loadHeartbeatDataUrl();
        };

        $scope.loadPrev = function() {
            offset -= 20;
            if (offset < 0) offset = 0;
            loadHeartbeatDataUrl();
        };

        $scope.loadForward = function() {
            offset += 100;
            loadHeartbeatDataUrl();
        };

        $scope.loadBack = function() {
            offset -= 100;
            if (offset < 0) offset = 0;
            loadHeartbeatDataUrl();
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