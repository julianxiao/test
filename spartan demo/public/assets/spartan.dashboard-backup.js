var client = new Keen({
    projectId: "5368fa5436bf5a5623000000",
    readKey: "3f324dcb5636316d6865ab0ebbbbc725224c7f8f3e8899c7733439965d6d4a2c7f13bf7765458790bd50ec76b4361687f51cf626314585dc246bb51aeb455c0a1dd6ce77a993d9c953c5fc554d1d3530ca5d17bdc6d1333ef3d8146a990c79435bb2c7d936f259a22647a75407921056"
});

Keen.ready(function() {


    // ----------------------------------------
    // Pageviews Area Chart
    // ----------------------------------------
    var pageviews_timeline = new Keen.Query("count", {
        eventCollection: "pageviews",
        interval: "hourly",
        groupBy: "user.device_info.browser.family",
        timeframe: {
            start: "2014-05-04T00:00:00.000Z",
            end: "2014-05-05T00:00:00.000Z"
        }
    });
    client.draw(pageviews_timeline, document.getElementById("chart-01"), {
        chartType: "areachart",
        title: false,
        height: 250,
        width: "auto",
        labelMapping: {
            "Mobile Safari": "Sensor 1",
            "IE": "Sensor 2",
            "Firefox": "Sensor 3",
            "Chrome": "Sensor 4"
        },
        chartOptions: {
            chartArea: {
                height: "85%",
                left: "5%",
                top: "5%",
                width: "80%"
            },
            isStacked: true
        }
    });

    var pageviews_metric1 = new Keen.Query("count", {
        eventCollection: "impressions",
        timeframe: {
            start: "2014-05-01T00:00:00.000Z",
            end: "2014-05-01T02:00:00.000Z"
        }

    });

    client.draw(pageviews_metric1, document.getElementById("chart-metric1"), {
        chartType: "metric",
        title: "Fault events",
        height: "auto",
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "85%",
                left: "5%",
                top: "5%",
                width: "80%"
            },
        },
        colors: ["#49c5b1"]
    });

    var pageviews_metric2 = new Keen.Query("count", {
        eventCollection: "pageviews",
        timeframe: {
            start: "2014-04-30T17:07:42.406Z",
            end: "2014-04-30T17:07:42.435Z"
        }

    });

    client.draw(pageviews_metric2, document.getElementById("chart-metric2"), {
        chartType: "metric",
        title: "Active devices",
        height: "auto",
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "85%",
                left: "5%",
                top: "5%",
                width: "85%"
            },
        },
        colors: ["#49c5b1"]
    });


    var pageviews_metric3 = new Keen.Query("count", {
        eventCollection: "impressions",
        timeframe: {
            start: "2014-04-01T00:00:00.000Z",
            end: "2014-05-01T00:10:00.000Z"
        }

    });

    client.draw(pageviews_metric3, document.getElementById("chart-metric3"), {
        chartType: "metric",
        title: "Amp in average",
        height: "auto",
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "85%",
                left: "5%",
                top: "5%",
                width: "85%"
            },
        },
        colors: ["#49c5b1"]
    });



    // ----------------------------------------
    // Pageviews Pie Chart
    // ----------------------------------------
    var pageviews_static = new Keen.Query("count", {
        eventCollection: "pageviews",
        groupBy: "user.device_info.browser.family",
        timeframe: {
            start: "2014-05-01T00:00:00.000Z",
            end: "2014-05-05T00:00:00.000Z"
        }
    });
    client.draw(pageviews_static, document.getElementById("chart-02"), {
        chartType: "piechart",
        title: false,
        height: 250,
        width: "auto",
        labelMapping: {
            "Mobile Safari": "Sensor 1",
            "IE": "Sensor 2",
            "Firefox": "Sensor 3",
            "Chrome": "Sensor 4"
        },

        chartOptions: {
            chartArea: {
                height: "85%",
                left: "5%",
                top: "5%",
                width: "100%"
            },
            pieHole: .4
        }
    });


    // ----------------------------------------
    // Impressions timeline
    // ----------------------------------------
    var impressions_timeline = new Keen.Query("count", {
        eventCollection: "impressions",
        groupBy: "ad.advertiser",
        interval: "hourly",
        timeframe: {
            start: "2014-05-04T00:00:00.000Z",
            end: "2014-05-05T00:00:00.000Z"
        }
    });
    client.draw(impressions_timeline, document.getElementById("chart-03"), {
        chartType: "columnchart",
        title: false,
        height: 250,
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "75%",
                left: "10%",
                top: "5%",
                width: "60%"
            },
            bar: {
                groupWidth: "85%"
            },
            isStacked: true
        }
    });


    // ----------------------------------------
    // Impressions timeline (device)
    // ----------------------------------------
    var impressions_timeline_by_device = new Keen.Query("count", {
        eventCollection: "impressions",
        groupBy: "user.device_info.device.family",
        interval: "hourly",
        timeframe: {
            start: "2014-05-04T00:00:00.000Z",
            end: "2014-05-05T00:00:00.000Z"
        }
    });
    client.draw(impressions_timeline_by_device, document.getElementById("chart-04"), {
        chartType: "columnchart",
        title: false,
        height: 250,
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "75%",
                left: "10%",
                top: "5%",
                width: "60%"
            },
            bar: {
                groupWidth: "85%"
            },
            isStacked: true
        }
    });


    // ----------------------------------------
    // Impressions timeline (country)
    // ----------------------------------------
    var impressions_timeline_by_country = new Keen.Query("count", {
        eventCollection: "impressions",
        groupBy: "user.geo_info.country",
        interval: "hourly",
        timeframe: {
            start: "2014-05-04T00:00:00.000Z",
            end: "2014-05-05T00:01:00.000Z"
        }
    });
    client.draw(impressions_timeline_by_country, document.getElementById("chart-05"), {
        chartType: "columnchart",
        title: false,
        height: 250,
        width: "auto",
        chartOptions: {
            chartArea: {
                height: "75%",
                left: "10%",
                top: "5%",
                width: "60%"
            },
            bar: {
                groupWidth: "85%"
            },
            isStacked: true
        }
    });


});