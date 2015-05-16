angular.module('devicesApp', [])
    .controller('DevicesController', ['$scope', '$http', function($scope, $http) {

        $scope.viewLoading = true;
        $scope.lineList = [];

        var urlFeeders = 'assets/lines.json';

        //var urlFeeders = '/api/Company/01/Feeders';

        $http.get(urlFeeders).
        success(function(data, status, headers, config) {

            $scope.lineList = data;
            $scope.viewLoading = false;
        }).
        error(function(data, status, headers, config) {
            console.log('error');
        });

        $scope.viewLoading = true;

        $scope.deviceList = [];

        var urlStatus = 'assets/status.json';

        //var urlStatus = '/api/Company/3M/Device/Status';

        $http.get(urlStatus).
        success(function(data, status, headers, config) {

            loadData(data);

            $scope.viewLoading = false;
        }).
        error(function(data, status, headers, config) {
            console.log('error');
        });

        function loadData(data) {
            var gateWays = data.Gateways;

            var arrayLength = gateWays.length;

            for (var i = 0; i < arrayLength; i++) {

                var deviceItem = gateWays[i];
                if (deviceItem.HeartBeat) {
                    var heartBeat = deviceItem.HeartBeat;
                    var deviceName = heartBeat.DeviceName;
                    var deviceFeeder = deviceItem.FeederSerialNumber;
                    var formattedTime = moment(heartBeat.RecordTime).format('MMMM Do YYYY, h:mm:ss a');
                    if (heartBeat.EnvironmentalData) {
                        var temperatureData = heartBeat.EnvironmentalData.Temp;
                        var waterData = heartBeat.EnvironmentalData.WaterLevel;
                        var humidityData = heartBeat.EnvironmentalData.Humidity;

                    } else {
                        var temperatureData = chance.integer({
                            min: 80,
                            max: 90
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

                    }
                    if (heartBeat.PowerMeasurements) {
                        var phrasereadingDataA = +heartBeat.PowerMeasurements.Phase.PhaseCA;
                        var phrasereadingDataB = +heartBeat.PowerMeasurements.Phase.PhaseBC;
                        var phrasereadingDataC = +heartBeat.PowerMeasurements.Phase.PhaseAB;

                        var RMS1Data = +heartBeat.PowerMeasurements.RmsCurrent[0].RmsCurrent;
                        var RMS2Data = +heartBeat.PowerMeasurements.RmsCurrent[0].RmsCurrent;
                        var RMS3Data = +heartBeat.PowerMeasurements.RmsCurrent[0].RmsCurrent;


                    } else {
                        var phrasereadingDataA = chance.floating({
                            min: 0,
                            max: 30,
                            fixed: 3
                        });
                        var phrasereadingDataB = chance.floating({
                            min: 0,
                            max: 30,
                            fixed: 3
                        });
                        var phrasereadingDataC = chance.floating({
                            min: 0,
                            max: 30,
                            fixed: 3
                        });
                        var RMS1Data = chance.floating({
                            min: 10,
                            max: 100,
                            fixed: 2
                        });
                        var RMS2Data = chance.floating({
                            min: 10,
                            max: 100,
                            fixed: 2
                        });
                        var RMS3Data = chance.floating({
                            min: 10,
                            max: 100,
                            fixed: 2
                        });

                    }


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

                    $scope.deviceList.push({
                        deviceID: deviceItem.WirelessGatewayId,
                        deviceName: deviceName,
                        feederID: deviceFeeder,
                        status: 'On',
                        timestamp: formattedTime,
                        temperature: temperatureData.toPrecision(4),
                        water: waterData,
                        humidity: humidityData.toPrecision(4),
                        RMS1: RMS1Data.toPrecision(5),
                        RMS2: RMS2Data.toPrecision(5),
                        RMS3: RMS3Data.toPrecision(5),
                        phrasereadingA: phrasereadingDataA.toPrecision(5),
                        phrasereadingB: phrasereadingDataB.toPrecision(5),
                        phrasereadingC: phrasereadingDataC.toPrecision(5),
                        CO2: CO2Data,
                        H2S: H2SData,
                        methane: methaneData
                    });


                } else {
                    // $scope.deviceList.push({
                    //     deviceID: deviceItem.WirelessGatewayId,
                    //     status: 'Off'
                    // });                 
                }
            }
        }


        $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

    }]);

angular.module('devicesApp')
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