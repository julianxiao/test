$(document).ready(function () {

    var selected = [];

    var table = $('#example').DataTable({
        
   /*     "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath": "libs/dataTables/media/copy_csv_xls_pdf.swf"
        }, */
        
        "ajax": "table.json",
        "columns": [
             { "data": "Sensor ID" },
           { "data": "Time created" },
            { "data": "Last updated" },
            { "data": "Mitigation employed" },
            { "data": "Methane reduction" },
            { "data": "Utility costs" },
            { "data": "Municipality costs" },
            { "data": "Land owner costs" },

            { "data": "Location (GPS)" },
            { "data": "Enclosure type" },
            { "data": "Radio type" },
            { "data": "Leak severity" },
            { "data": "Power source" },
            { "data": "Surface features" },
            { "data": "Surface features" },
            { "data": "Temperature (F)" },
            { "data": "Methane (ppm)" },
            { "data": "CO (ppm)" },
            { "data": "CO2 reading" },
            { "data": "Barometric pressure" },
            { "data": "System prioritization" },
            { "data": "Human prioritization" }
        ],

        "order": [
            [14, "asc"]
        ],

        "paging": false,
        "info": false,


        "rowCallback": function (row, data, displayIndex) {
            if ($.inArray(data.DT_RowId, selected) !== -1) {
                $(row).addClass('selected');
            }
        },

        "fnInitComplete": function(oSettings, json) {
        var table = $('#example').DataTable();
            $("#example thead th").each( function ( i ) {
            var select = $('<select><option value="">Filter on:</option></select>')
                .appendTo( this )
                .on( 'change', function () {
                    table.column( i )
                        .search( $(this).val() )
                        .draw();
                } );
     
            table.column( i ).data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );

        table.column(8).visible(false);
          table.column(9).visible(false);
          table.column(10).visible(false);
          table.column(12).visible(false);
          table.column(13).visible(false);
         table.column(14).visible(false);
         table.column(15).visible(false);

        }



    });


   $("#example tfoot th").each(function (i) {

        var select = $('<select id="select' + i + '"><option value=""></option></select>')
            .appendTo($(this).empty())
            .on('change', function () {
                table.column(i)
                    .search($(this).val())
                    .draw();
            });

        table.column(i).data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>');
        });

    }); 

    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();

        // Get the column API object
        var column = table.column($(this).attr('data-column'));

        // Toggle the visibility
        column.visible(!column.visible());
        $(this).toggleClass('dim');
    });


    $('#buttonEdit').click(function () {
        console.log(' row(s) ' + selected + ' selected. ');
        if (selected.length > 0)
            $('#myModal').modal('show');
    });


/*
    $('#example tbody').on('click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);

        if (index === -1) {
            selected.push(id);
        } else {
            selected.splice(index, 1);
        }

        $(this).toggleClass('success');

    }); */

         


});