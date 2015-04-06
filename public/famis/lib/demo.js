

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}          



angular.module('demoApp', ['geolocation'])
  .controller('DemoController', function($scope, geolocation) {



    $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');


    var id = getUrlParameter('id');

    console.log(id);

    $scope.coords = geolocation.getLocation().then(function(data){

           $scope.message = id;
           $scope.coordDone = true;

      return {lat:data.coords.latitude, long:data.coords.longitude};
    });




  });