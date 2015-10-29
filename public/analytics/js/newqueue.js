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
            }
        ];

    var table = $('#example').DataTable({

        /*     "dom": 'T<"clear">lfrtip',
             "tableTools": {
                 "sSwfPath": "libs/dataTables/media/copy_csv_xls_pdf.swf"
             }, */

        "ajax": "newtable.json",
        "columns": variables,

        "order": [
            [1, "asc"]
        ],

        "paging": false,
        "info": false,

        "processing": true,

        "rowCallback": function(row, data, displayIndex) {
            if ($.inArray(data["Ticket Number"], selected) !== -1) {
                $(row).addClass('selected');
            }
        },

        "fnInitComplete": function(oSettings, json) {
            var table = $('#example').DataTable();
            $("#example thead th").each(function(i) {
                    var select = $('<select><option value="">Filter on:</option></select>')
                        .appendTo(this)
                        .on('change', function() {
                            table.column(i)
                                .search($(this).val())
                                .draw();
                        });

                    table.column(i).data().unique().sort().each(function(d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });

                    if (select.children('option').length > 10) {
                        select.hide();
                    }

                }

            );

            for (var i = 5; i < variables.length; i ++)
            {
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