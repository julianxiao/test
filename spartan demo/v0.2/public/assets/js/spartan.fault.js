var app = angular.module('faultApp', [])
    .controller('FaultController', ['$scope', '$http', function($scope, $http) {

        $scope.faultEvents = [];
        $scope.deviceList = [];

        var offset = 0;
        var deviceSelected = '';
        var dateSelected = '';
        
        var ulrBase = '/api/faults?_sort=RecordTime&_order=DESC&_limit=20&_start=';
        var ulrConfig = '/assets/data/config.json';

        $http.get(ulrConfig).success(function(data, status, headers, config) {
                $scope.deviceList = data.deviceNames;
            })
            .then(function() {
                loadFaultData(ulrBase + offset);
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

        function loadFaultDataUrl() {
            var url = ulrBase + offset;
            if (deviceSelected) {
                url = url + '&DeviceName=' + deviceSelected;
            }

            if (dateSelected) {
                url = url + '&Date=' + dateSelected;
            }

            loadFaultData(url);

        }

        $scope.changeDevice = function(selectValue) {
            offset = 0;
            deviceSelected = selectValue;
            loadFaultDataUrl();
        };

        $scope.changeDate = function(selectedDate) {
            offset = 0;
            dateSelected = moment(selectedDate).format('YYYY-MM-DD');
            loadFaultDataUrl();
        };


        $scope.loadNext = function() {
            offset += 20;
            loadFaultDataUrl();
        };

        $scope.loadPrev = function() {
            offset -= 20;
            if (offset < 0) offset = 0;
            loadFaultDataUrl();
        };

        $scope.loadForward = function() {
            offset += 100;
            loadFaultDataUrl();
        };

        $scope.loadBack = function() {
            offset -= 100;
            if (offset < 0) offset = 0;
            loadFaultDataUrl();
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