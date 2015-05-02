function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

angular.module('faultApp', ['simplePagination'])
    .controller('FaultController', ['$scope', '$http', 'Pagination', 'filterFilter', function($scope, $http, Pagination, filterFilter) {

        $scope.viewLoading = true;

        $scope.faultEvents = [];
        $scope.deviceList = [];


        var url = 'assets/devices.json';

        //     var url = '/api/Company/01/Devices';

        $http.get(url).
        success(function(data, status, headers, config) {

            loadOptions(data);

            $scope.viewLoading = false;
        }).
        error(function(data, status, headers, config) {
            console.log('error');
        });

        function loadOptions(data) {
            for (var i = 0; i < data.length; i++) {
                $scope.deviceList.push(data[i].DeviceName);
            }

        }

        $scope.viewLoading = true;

        $scope.deviceList = [];

        var url = 'assets/faults.json';

        //var url = '/api/Faults/Device/Recent/3M/SP1019?limit=100';

        $http.get(url).
        success(function(data, status, headers, config) {

            loadData(data);

            $scope.viewLoading = false;
        }).
        error(function(data, status, headers, config) {
            console.log('error');
        });

        function loadData(data) {

            if (data.FaultCount > 0) {
                var faults = data.Faults;

                for (var i = 0; i < faults.length; i++) {
                    var fault = faults[i];
                    var deviceName = fault.DeviceName;
                    var lineID = fault.LineId;
                    var formattedTime = moment(fault.RecordTime).format('MMMM Do YYYY, h:mm:ss a');
                    $scope.faultEvents.push({
                        deviceID: deviceName,
                        lineID: lineID,
                        timestamp: formattedTime,
                        id: fault.FaultId,
                        temperature: chance.integer({
                            min: 80,
                            max: 90
                        }),
                        currentreading: chance.floating({
                            min: 10,
                            max: 100,
                            fixed: 2
                        })
                    });

                }
            } else {

                for (var i = 0; i < 100; i++) {

                    var formattedTime = moment().subtract(Math.round(Math.random() * 30), 'days')
                        .add(Math.round(Math.random() * 10), 'hours').add(Math.round(Math.random() * 60), 'minutes')
                        .add(Math.round(Math.random() * 60), 'second').format();

                    var temperatureData = chance.integer({
                        min: 50,
                        max: 90
                    });
                    var deviceIDData = 'Sensor ' + chance.integer({
                        min: 1,
                        max: 4
                    });
                    var currentreadingData = chance.floating({
                        min: 10,
                        max: 100,
                        fixed: 2
                    });

                    var methaneData = chance.integer({
                        min: 10,
                        max: 100
                    });
                    var CO2Data = chance.integer({
                        min: 10,
                        max: 100
                    });
                    var H2SData = chance.integer({
                        min: 10,
                        max: 100
                    });
                    var waterData = chance.floating({
                        min: 0,
                        max: 10,
                        fixed: 1
                    });
                    var humidityData = chance.integer({
                        min: 10,
                        max: 100
                    });
                    var currentreadingDataA = chance.floating({
                        min: 10,
                        max: 100,
                        fixed: 2
                    });
                    var currentreadingDataB = chance.floating({
                        min: 10,
                        max: 100,
                        fixed: 2
                    });
                    var currentreadingDataC = chance.floating({
                        min: 10,
                        max: 100,
                        fixed: 2
                    });

                    $scope.faultEvents.push({
                        deviceID: deviceIDData,
                        id: i,
                        lineID: 'LSP101',
                        status: 'On',
                        timestamp: formattedTime,
                        temperature: temperatureData,
                        currentreading: currentreadingData,
                        currentreadingA: currentreadingDataA,
                        currentreadingB: currentreadingDataB,
                        currentreadingC: currentreadingDataC,
                        humidity: humidityData,
                        CO2: CO2Data,
                        H2S: H2SData,
                        water: waterData,
                        humidity: humidityData,
                        methane: methaneData
                    });
                }
            }

            $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

            $scope.pagination = Pagination.getNew(10);
            $scope.pagination.numPages = Math.ceil($scope.faultEvents.length / $scope.pagination.perPage);


            $scope.$watch('filterDevice', function(term) {
                // Create filtered 
                $scope.filtered = filterFilter($scope.faultEvents, term);

                // Then calculate noOfPages
                $scope.pagination.numPages = Math.ceil($scope.filtered.length / $scope.pagination.perPage);

            })

            var query = getQueryParams(document.location.search);

            if (query.device) {
                $scope.filterDevice = query.device;
            }


        }

    }]);

angular.module('faultApp')
    .directive('myLoadingSpinner', function() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                loading: '=myLoadingSpinner'
            },
            templateUrl: 'assets/loading.html',
            link: function(scope, element, attrs) {
                var spinner = new Spinner().spin();
                var loadingContainer = $(element).find('.my-loading-spinner-container')[0];
                loadingContainer.appendChild(spinner.el);
            }
        };
    });