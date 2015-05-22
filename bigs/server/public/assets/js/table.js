/**
 * Transposes a given array.
 * @id Array.prototype.transpose
 * @author Shamasis Bhattacharya
 *
 * @type Array
 * @return The Transposed Array
 * @compat=ALL
 */
Array.prototype.transpose = function() {

  // Calculate the width and height of the Array
  var a = this,
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if (h === 0 || w === 0) {
    return [];
  }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for (i = 0; i < h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for (j = 0; j < w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};


$(document).ready(function() {

  var container = document.getElementById('adv_example');
  var container2 = document.getElementById('adv_example2');
  var container3 = document.getElementById('adv_example3');

  var percentRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.NumericRenderer.apply(this, arguments);
    td.style.color = (value < 0) ? 'red' : 'green';
  };

  var advancedData =
    [
      [0.4572108677, -0.4982536009, 0.8366006315, 0.9683366708, 0.149209729, 0.3497939867, -0.01322544386, -0.4926525949, -0.9787569291, 0.05171745327],
      [-0.1386493876, 0.5444470443, -0.6603305174, -0.6465919143, -0.4138697658, -0.09456215637, -0.6831314425, 0.9047072481, 0.9367030904, 0.4698054303],
      [-0.4259324792, 0.8270278472, -0.5059778772, 0.2572492328, 0.1469899186, -0.215893625, 0.5156060963, 0.07429012418, -0.8379224429, -0.8587690083],
      [0.9864132631, -0.7045008281, 0.0352704276, -0.2338702169, 0.4270820989, 0.7693495954, 0.843595107, 0.02563950099, -0.5726470583, 0.1214298055],
      [-0.5897190126, -0.4993057185, -0.05578383427, 0.6065770328, -0.27323028, -0.5655273086, 0.4786652014, 0.1004422892, -0.09459484604, 0.5892415091],
      [-0.3342513613, 0.1901129539, -0.6136983026, 0.454224815, -0.2931093427, 0.9299030783, -0.2202382166, -0.2691557743, 0.0121622807, -0.01312499165],
      [0.003550056096, 0.1035166921, 0.04491172298, 0.8711615844, 0.08673491077, 0.7023482415, 0.177686508, 0.3664021996, 0.3130917862, 0.6525753903],
      [0.9252751233, -0.9103898037, 0.6212670089, 0.6543159249, -0.6910576295, 0.3727043451, -0.8854751743, 0.312376882, 0.1427356375, 0.005201338838],
      [-0.8507662168, -0.6270695831, -0.8977701784, 0.1737021039, -0.3043285154, 0.8396498535, 0.9704769338, 0.02288824512, 0.0398389786, 0.5146542135],
      [-0.2758937195, -0.5470607434, -0.8821140192, 0.2912816713, 0.6233275612, -0.4758194738, 0.1270053339, 0.514196544, 0.6511644477, -0.6732819746],
    ];

  var hot = new Handsontable(container, {
    data: advancedData,
    height: 280,
    colHeaders: ["IV1", "IV2", "IV3", "IV4", "IV5", "IV6", "IV7", "IV8", "IV9", "IV10"],
    rowHeaders: ["IV1", "IV2", "IV3", "IV4", "IV5", "IV6", "IV7", "IV8", "IV9", "IV10"],
    stretchH: 'all',
    columnSorting: true,
    contextMenu: true,
    className: "htCenter htMiddle",
    columns: [{
      data: 0,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 1,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 2,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 3,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 4,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 5,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 6,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 7,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 8,
      type: 'numeric',
      format: '0,0.00[0000]'
    }, {
      data: 9,
      type: 'numeric',
      format: '0,0.00[0000]'
    }]
  });
  var advancedData2 =
    [
      [0.5, 0.25, 0, 0, -0.5, 1, 0, 0, -0.25, -1]
    ];
  var advancedData3 =
    [
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1],
      [0, 2, 0.1]
    ];

  var hot2 = new Handsontable(container2, {
    data: advancedData2,
    height: 80,
    colHeaders: ["IV1", "IV2", "IV3", "IV4", "IV5", "IV6", "IV7", "IV8", "IV9", "IV10"],
    rowHeaders: ["DVs"],
    stretchH: 'all',
    columnSorting: true,
    contextMenu: true,
    className: "htCenter htMiddle",
    columns: [{
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }

    ]
  });

  var hot3 = new Handsontable(container3, {
    data: advancedData3,
    height: 300,
    colHeaders: ["Min", "Max", "Step"],
    rowHeaders: ["IV1", "IV2", "IV3", "IV4", "IV5", "IV6", "IV7", "IV8", "IV9", "IV10"],
    stretchH: 'all',
    columnSorting: true,
    contextMenu: true,
    className: "htCenter htMiddle",
    columns: [{
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }, {
        type: 'numeric',
        format: '0.00'
      }

    ]
  });

  $("#bigsButton").click(function(e) {
    e.preventDefault();
    $('#dots').addClass("ellipsis_animated-inner");
    $('#basicModal').modal('show');


    var data1 = hot.getData();
    var data2 = hot2.getData();
    data1.push(data2[0]);
    var myJsonString = JSON.stringify(data1);
    $.ajax('/api/calcBigs', {
    data : JSON.stringify(data1),
    contentType : 'application/json',
    type : 'POST',
      success: processData
    });

    function processData(data) {
      var chartData = data.transpose();


      $('#container').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10'],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Causal effects'
          }
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Mean effect',
          data: chartData[0]

        }, {
          name: 'Confident Interval',
          data: chartData[1]

        }]
      });
      $('#dots').removeClass("ellipsis_animated-inner");

    }
    //$('#basicModal').modal('hide');

    //var arr = $.map(data, function(el) { return el; });


  });


});