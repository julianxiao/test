$(document).ready(function() {



    var selected = [];

    var variables = [{
            "data": "Ticket Number"
        }, {
            "data": "Call Date"
        }, {
            "data": "Ticket Age"
        }, {
            "data": "Target Cost Center (TCC)"
        }, {
            "data": "Address"
        }, {
            "data": "Place"
        }, {
            "data": "County"
        }, {
            "data": "State"
        }, {
            "data": "Contact Name"
        }, {
            "data": "Contact Phone"
        }, {
            "data": "Excavator Name (Adjusted)"
        }, {
            "data": "Ticket Type/Priority/Category"
        },

        {
            "data": "Work Done For (Adjusted)"
        }, {
            "data": "Excavation Method/Working On"
        }, {
            "data": "Probability Group"
        }, {
            "data": "Risk Group"
        }, {
            "data": "Damage Rate"
        }, {
            "data": "Risk Score"
        }, {
            "data": "Planned"
        }, {
            "data": "Overdue"
        }, {
            "data": "Cancelled"
        }, {
            "data": "Completed"
        }, {
            "data": "Human Strata"
        }, {
            "data": "Recommended Actions",
            "render": function(data, type, full, meta) {
                return '<button>Confirm!</button>' + data;
            }
        }
    ];

    var table = $('#example').DataTable({

        /*     "dom": 'T<"clear">lfrtip',
             "tableTools": {
                 "sSwfPath": "libs/dataTables/media/copy_csv_xls_pdf.swf"
             }, */

        "ajax": "newtable.json",
        "columns": variables,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button>Click!</button>"
        }],

        "order": [
            [0, "asc"]
        ],

        "searching": true,


        "paging": false,
        "info": false,

        "processing": true,

        "rowCallback": function(row, data, displayIndex) {
            if ($.inArray(data["Ticket Number"], selected) !== -1) {
                $(row).addClass('selected');
            }
        },

        
/*
        "fnInitComplete": function(oSettings, json) {
            var table = $('#example').DataTable();
            $("#example thead th").each(function(i) {
                    var select = $('<select><option value="">Filter on:</option></select>')
                        .appendTo(this)
                        .on('change', function() {
                       var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        table.column(i)
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                table.column(i).unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );

 

                    if (select.children('option').length > 10) {
                        //select.hide();
                    }

                }

            );




        }  */
               initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty())
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );

                        for (var i = 5; i < variables.length - 2; i++) {
                table.column(i).visible(false);
            }
        } 



    });


    /*   $("#example tfoot th").each(function (i) {

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

       }); */

    $('a.toggle-vis').on('click', function(e) {
        e.preventDefault();

        // Get the column API object
        var column = table.column($(this).attr('data-column'));

        // Toggle the visibility
        column.visible(!column.visible());
        $(this).toggleClass('strike-hide');
    });


    $('#buttonAction').click(function() {
        //alert( table.rows('.success').data().length +' row(s) selected' );
        if (table.rows('.success').data().length > 0)
            $('#myModal').modal('show');
        else
            alert("please select ticket(s) first!");
    });
    $('#buttonOutcome').click(function() {
        //alert( table.rows('.success').data().length +' row(s) selected' );
        if (table.rows('.success').data().length > 0)
            $('#myOutcomeModal').modal('show');
        else
            alert("please select ticket(s) first!");
    });

    $('#buttonAll').click(function() {
        //alert( table.rows('.success').data().length +' row(s) selected' );
        var table = $('#example').DataTable();
        $("#example tbody tr").each(function(i) {
                $(this).addClass('success');


            }

        );

    });

    $('#buttonNone').click(function() {
        //alert( table.rows('.success').data().length +' row(s) selected' );
        var table = $('#example').DataTable();
        $("#example tbody tr").each(function(i) {
                $(this).removeClass('success');


            }

        );

    });




    $('#example tbody').on('click', 'tr', function() {
        var id = this.id;

        var index = $.inArray(id, selected);

        if (index === -1) {
            selected.push(id);
        } else {
            selected.splice(index, 1);
        }

        $(this).toggleClass('success');


    });



});