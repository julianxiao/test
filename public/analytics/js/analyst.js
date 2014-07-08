/*
 * Real-time data generators for the example graphs in the documentation section.
 */
(function() {

    /*
     * Class for generating real-time data for the area, line, and bar plots.
     */
    var levelMax = [100, 100, 100];

    var RealTimeData = function(layers) {
        this.layers = layers;
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    };

    RealTimeData.prototype.rand = function(i) {

        //console.log(levelMax);
        return parseInt(Math.random() * levelMax[i]) + 50;
    };

    RealTimeData.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 60;
        }

        var history = [];

        for (var k = 0; k < this.layers; k++) {
            var level = "Severity level " + k;
            history.push({label: level, values: []});
        }

        for (var i = 0; i < entries; i++) {
            for (var j = 0; j < this.layers; j++) {
                history[j].values.push({time: this.timestamp, y: this.rand(j)});
            }
            this.timestamp++;
        }

        return history;
    };

    RealTimeData.prototype.next = function() {
        var entry = [];
        for (var i = 0; i < this.layers; i++) {
            entry.push({ time: this.timestamp, y: this.rand(i) });
        }
        this.timestamp++;

        levelMax[0] = levelMax[0] -  5;
        levelMax[1] = levelMax[1] - 1;
        levelMax[2] = levelMax[2] - 1; 

        if (levelMax[1] < -50) levelMax[1] = -50;
        if (levelMax[0] < -50) levelMax[0] = -50;
        if (levelMax[2] < -50) levelMax[2] = -50;
        //if (levelMax[0] < 150) levelMax[0] = 150;
        //if (levelMax[2] > 150) levelMax[2] = 150;

        return entry;
    }

    window.RealTimeData = RealTimeData;
    window.levelMax = levelMax;





})();
