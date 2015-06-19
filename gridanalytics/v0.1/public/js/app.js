var ulrBase = '/api/events?';


var app = angular.module('dataApp', [])
    .controller('DataController', ['$scope', '$http', function($scope, $http) {

        $scope.items = [];
        $scope.eventTypeList = [];
        $scope.sortList = [];

        var offset = 0,
            eventSelected = '',
            sortSelected = '';

        $scope.eventTypeList = ['DE', 'NDE'];
        $scope.sortList = ['Event Magnitude_I', 'Event Magnitude_V', 'Phases Involved', 'Event Description', 'Utility Report Filename', 'Santoso Report Filename'];

        loadItemData(ulrBase + '_limit=10');


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
            var url = ulrBase;
            if (eventSelected) {
                url = url + '&Event%10Type=' + eventSelected;
            }
            if (sortSelected) {
                url = url + '&_sort=' + encodeURI(sortSelected)+ '&_order=DESC';
            }
            url = url + '&_limit=10&_start=' + offset;
            loadItemData(url);
        }

        $scope.changeType = function(selectValue) {
            offset = 0;
            eventSelected = selectValue;
            loadItemDataUrl();
        };

        $scope.changeSort = function(selectValue) {
            offset = 0;
            sortSelected = selectValue;
            loadItemDataUrl();
        };


        $scope.loadNext = function() {
            offset += 10;
            loadItemDataUrl();
        };

        $scope.loadPrev = function() {
            offset -= 10;
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
