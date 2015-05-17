
var app = angular.module('dataApp', [])
    .controller('DataController', ['$scope', '$http', function($scope, $http) {

        $scope.items = [];
        $scope.deviceList = [];
        $scope.UIsettings = {};

        var offset = 0,
            deviceSelected = '',
            dateSelected = '';

        $http.get(ulrConfig).success(function(data, status, headers, config) {
                var configData = getConfig(data);
                $scope.deviceList = configData.devices.serialNumbers;
                $scope.UIsettings = configData.UISettings;
            })
            .then(function() {
                loadItemData(ulrBase + offset);
            });

        function loadItemData(url) {
            $scope.viewLoading = true;
            $http.get(url).success(function(data, status, headers, config) {
                $scope.items = data;
                $scope.viewLoading = false;
            }).
            error(function(data, status, headers, config) {
                console.log(url + ' :reading data error!');
            });
        }

        function loadItemDataUrl() {
            var url = ulrBase + offset;
            if (deviceSelected) {
                url = url + '&DeviceName=' + deviceSelected;
            }

            if (dateSelected) {
                url = url + '&Date=' + dateSelected;
            }

            loadItemData(url);
        }

        $scope.changeDevice = function(selectValue) {
            offset = 0;
            deviceSelected = selectValue;
            loadItemDataUrl();
        };

        $scope.changeDate = function(selectedDate) {
            offset = 0;
            dateSelected = '';
            if(selectedDate)
            {
                dateSelected = moment(selectedDate).format('YYYY-MM-DD');
            }
            loadItemDataUrl();
        };

        $scope.loadNext = function() {
            offset += 20;
            loadItemDataUrl();
        };

        $scope.loadPrev = function() {
            offset -= 20;
            if (offset < 0) offset = 0;
            loadItemDataUrl();
        };

        $scope.loadForward = function() {
            offset += 100;
            loadItemDataUrl();
        };

        $scope.loadBack = function() {
            offset -= 100;
            if (offset < 0) offset = 0;
            loadItemDataUrl();
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
    var config = null;
    var query = getQueryParams(document.location.search);
    config = data.production;
    if (query.debug==='true') {
        config = data.development;
    }
    if (!config) console.log("error reading configuration data!");
    return config;
}
