var ulrBase = '/api/heartbeats?_sort=RecordTime&_order=DESC&_start=0&_limit=1&DeviceName=',
    ulrConfig = '/api/config';

var app = angular.module('devicesApp', [])
    .controller('DevicesController', ['$scope', '$http', function($scope, $http) {

        $scope.items = [];
        $scope.UIsettings = {};

        var deviceList = [],
            deviceAlias = [],
            description = [],
            refreshRate = 30;

        var offset = 0,
            deviceSelected = '',
            dateSelected = '';

        $http.get(ulrConfig).success(function(data, status, headers, config) {
                var configData = getConfig(data);
                deviceList = configData.devices.serialNumbers;
                deviceAlias = configData.devices.names;
                description = configData.devices.information;
                $scope.UIsettings = configData.UISettings;
                refreshRate = configData.UISettings.refreshRate * 1000;
            })
            .then(function() {
                reloadStatus();
                setInterval(reloadStatus, refreshRate);
            });

        function reloadStatus() {
            $scope.items = [];
            for (var i = 0; i < deviceList.length; i++) {
                loadHeartbeatData(i);
            }
        }

        function loadHeartbeatData(i) {
            var url = ulrBase + deviceList[i];
            $scope.viewLoading = true;
            $http.get(url).success(function(data, status, headers, config) {
                if (data[0]) {
                    var item = data[0];
                    item.alias = deviceAlias[i];
                    item.information = description[i];
                    $scope.items.push(item);
                    $scope.viewLoading = false;
                }
            }).
            error(function(data, status, headers, config) {
                console.log(url + ' :reading data error!');
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



function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function getConfig(data) {
    var config = {};
    var query = getQueryParams(document.location.search);
    config = data.production;
    if (query.debug === 'true') {
        config = data.development;
    }
    return config;
}