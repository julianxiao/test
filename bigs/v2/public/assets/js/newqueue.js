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
    }, {
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
        "data": "Human Priority"
    }, {
        "data": "Candidate Actions"
    }, {
        "data": "System Priority"
    }, {
        "data": "Recommended Actions"
    }, {
        "data": "Outcome",
        "render": function(data, type, full, meta) {
            return '<button class="confirmNo">No</button>' + data;
        }
    }];

    var table = $('#example').DataTable({

        /*     "dom": 'T<"clear">lfrtip',
             "tableTools": {
                 "sSwfPath": "libs/dataTables/media/copy_csv_xls_pdf.swf"
             }, */

        "ajax": "assets/data/newtable1.json",
        "columns": variables,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button>Click!</button>"
        }],

        "order": [
            [0, "asc"]
        ],

        select: {
            style: 'os'
        },

        "searching": true,
        "deferRender": true,

        "paging": true,
        "info": false,

        "processing": true,

        "rowCallback": function(row, data, displayIndex) {
            if ($.inArray(data["Ticket Number"], selected) !== -1) {
                $(row).addClass('selected');
            }
        },

        fnInitComplete: function() {
            for (var i = 0; i < variables.length - 5; i++) {
                table.column(i).visible(false);
            };

            table.column(0).visible(true);
            table.column(2).visible(true);
            table.column(11).visible(true);
            table.column(17).visible(true);


            this.api().columns().every(function() {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
                if (select.children('option').length > 100) {
                    select.hide();
                }
               // console.log(column.index())
                if (column.index() > 21)
                    select.hide();
            });


        }



    });


    $('a.toggle-vis').on('click', function(e) {
        e.preventDefault();

        // Get the column API object
        var column = table.column($(this).attr('data-column'));

        // Toggle the visibility
        column.visible(!column.visible());
        $(this).toggleClass('strike-hide');
    });


    $('#buttonAction').click(function() {
        if (table.rows({
                selected: true
            }).data().length > 0) {

            $('#myModal').modal('show');
        } else
            alert("please select ticket(s) first!");
    });

     $('#buttonActionDone').click(function() {

        var queValue = $('input[name=radios4]:checked', '#actionForm').val();
        var actionList = '';
        actionList = actionList + $('input[name=radios1]:checked', '#actionForm').val();
        actionList = actionList + $('input[name=radios2]:checked', '#actionForm').val();
        actionList = actionList + $('input[name=radios3]:checked', '#actionForm').val();


            table.rows({
                selected: true
            }).every(function() {
                var d = this.data();

                d["Human Priority"] = queValue; // update data source for the row
                d['Candidate Actions'] = actionList;

                this.invalidate(); // invalidate the data DataTables has cached for this row
            });

            // Draw once all updates are done
            table.draw(); 

    });
   

    $('#buttonOutcome').click(function() {
        //alert( table.rows('.success').data().length +' row(s) selected' );
        if (table.rows({
                selected: true
            }).data().length > 0)
            $('#myOutcomeModal').modal('show');
        else
            alert("please select ticket(s) first!");
    });



    /*
        $('#example tbody').on('click', 'tr', function() {
            var id = this.id;

            var index = $.inArray(id, selected);

            if (index === -1) {
                selected.push(id);
            } else {
                selected.splice(index, 1);
            }

            $(this).toggleClass('success');


        });  */



});