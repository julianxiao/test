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


    var levelMax2 = [33, 33, 33];

    var RealTimeData2 = function(layers) {
        this.layers = layers;
        this.timestamp = ((new Date()).getTime() / 1000)|0;
    };

    RealTimeData2.prototype.rand = function() {

        //console.log(levelMax);
        return (Math.random() * 30 + 80)/100;
    };

    RealTimeData2.prototype.history = function(entries) {
        if (typeof(entries) != 'number' || !entries) {
            entries = 60;
        }

        var history = [];

        for (var k = 0; k < this.layers; k++) {
            var level = "Severity level " + k;
            history.push({label: level, values: []});
        }

        for (var i = 0; i < entries; i++) {
            var totalNumber = this.rand();
            for (var j = 0; j < this.layers; j++) {
                history[j].values.push({time: this.timestamp, y: totalNumber*levelMax2[j]});
            }
            this.timestamp++;
        }

        return history;
    };

    RealTimeData2.prototype.next = function() {
        var entry = [];
         var totalNumber = this.rand();
        for (var i = 0; i < this.layers; i++) {
            entry.push({ time: this.timestamp, y: totalNumber*levelMax2[i] });
        }
        this.timestamp++;

        levelMax2[0] = levelMax2[0] + 2;
        levelMax2[1] = levelMax2[1] - 1;
        levelMax2[2] = levelMax2[2] - 1; 

        if (levelMax2[1] <= 0) levelMax2[1] = 5;
        if (levelMax2[2] <= 0) levelMax2[2] = 5;
        if (levelMax2[0] >= 100) levelMax2[0] = 90;

        return entry;
    }

    window.RealTimeData2 = RealTimeData2;

    window.levelMax2 = levelMax2;



})();
