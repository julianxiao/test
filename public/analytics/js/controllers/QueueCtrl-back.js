angular.module('QueueCtrl', []).controller('QueueController', function($scope) {

	$scope.tagline = 'Wait in line!';

     var selected = [];

	var table  = $('#example').DataTable({
         "order": [[ 14, "asc" ]],


         "processing": true,

        "rowCallback": function( row, data, displayIndex ) {
            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                $(row).addClass('selected');
            }
        }

    })

    

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

        $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
 
        // Get the column API object
        var column = table.column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    } );


    $('#buttonEdit').click( function () {
        alert( ' row(s) ' + selected + ' selected. ');
    } );



    $('#example tbody').on('click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);
 
        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }
 
        $(this).toggleClass('success');

     } );

 /*   var temp = $("#select0");
    temp.remove();
	temp = $("#select3");
	temp.remove(); */

});