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
      [0.340775334, -0.505567665, 0.341692488, -0.183592878, 0.307813036, 0.94698551, 0.220726844, 0.038931712, 0.551154511, -0.671445796],
      [0.665276095, -0.376697564, 0.533573723, 0.676627581, 0.472198598, -0.277661202, 0.563442872, 0.708612973, -0.96857391, 0.522880441],
      [-0.880202613, -0.429189431, 0.501507852, 0.853222183, -0.621935519, 0.572159461, -0.467820969, -0.419163543, -0.336789807, 0.655070956],
      [0.035313307, 0.206508974, -0.928840862, -0.474491721, -0.959753339, -0.005863228, -0.48144159, -0.150846177, 0.864392557, -0.338655822],
      [-0.943512539, -0.492908779, 0.834651302, 0.523059958, -0.641838875, -0.477728388, -0.49891121, -0.305420104, 0.810882704, 0.417560917],
      [-0.688012961, 0.883752555, 0.577551182, 0.439693729, 0.263566889, -0.138168021, -0.684697218, -0.906135518, 0.601907131, 0.445881486],
      [0.023209109, 0.487621691, -0.303467423, 0.306497264, -0.35087995, -0.272190566, 0.790162551, 0.22551275, -0.91469812, 0.369367306],
      [-0.790861533, 0.288164886, 0.001676213, 0.771070918, -0.490535673, -0.305812573, 0.119143464, -0.523796296, 0.12362275, 0.547720399],
      [0.158942513, -0.864065588, -0.761111055, 0.935080953, 0.145491812, 0.882530596, -0.067752118, -0.807751426, -0.835945743, -0.701380657],
      [-0.43323569, 0.727722525, 0.383393904, 0.328155043, -0.565658025, -0.350911372, 0.789926278, 0.599418627, -0.904980295, 0.715463161]
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    $.getJSON("api/execBigs", function(data) {

      //$('#basicModal').modal('hide');

      //var arr = $.map(data, function(el) { return el; });

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

    });
  });


});