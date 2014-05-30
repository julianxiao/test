angular.module('QueueCtrl', []).controller('QueueController', function($scope) {

	$scope.tagline = 'Wait in line!';

	var table  = $('#example').DataTable();

    $("#example tfoot th").each( function ( i ) {
        var select = $('<select id="select' + i + '"><option value=""></option></select>')
            .appendTo( $(this).empty() )
            .on( 'change', function () {
                table.column( i )
                    .search( $(this).val() )
                    .draw();
            } );
 
        table.column( i ).data().unique().sort().each( function ( d, j ) {
            select.append( '<option value="'+d+'">'+d+'</option>' )
        } );
    } );

    var temp = $("#select0");
    temp.remove();
	temp = $("#select3");
	temp.remove();

});