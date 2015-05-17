Hi all,

I built a test site over the weekend for both the backend and the front end.

[https://afternoon-journey-1416.herokuapp.com]

Phil, you can use the site to test WCG functions. Simply directing you post request to [https://afternoon-journey-1416.herokuapp.com/api/heartbeats] and [https://afternoon-journey-1416.herokuapp.com/api/faults] for the heartbeat and fault event respectively. Refresh the webpage to see the update. Note, by default, the system expects 01 - 05 as the "DeviceName". If you prefer to use other names, you can change the server settings by sending a post message to [api/config], I can show you how to do that.

Please note that the server uses in-memory database so its content is not persisted to the disk. Everytime the server re-start, you lose all the data. But, you start with some nice and clean simulated data everytime. No corrupted data lingering on the server, which is good for debugging purposes.

Also, there are some typos in your document for the data format, missing quotaion mark and comma somewhere. Please check [https://afternoon-journey-1416.herokuapp.com/api/schema.json] as your reference for the data format.

Ernie, please take a close look at the website, which just consists of three webpages. And that's what we will have for the trial. Please sign off the design after you review it. Any additional UI features that require new WCG function or backend support, in my opinion, is un-realistic at this point. The feature set needs to be frozen by this week to leave enough time for tuning and debugging the entire system.

Lyle, I am responsible for the front UI and the attache zip file is my deliverable. Simply unzip the file and deploy the directory under the www root. Since all files are static HTML5 and javascript files, no additional server integration is needed. All is ready to go, except the config.json file (you can see a copy of the file on the front end [https://afternoon-journey-1416.herokuapp.com/assets/data/config.json]). It contains the configuration for the front end system, e.g. the list of the serial numbers for the WCGs etc, which should be the only thing hard coded in the firmware on each individual WCG. In my opinion, all the other depolyment information for the trial, such as feeders and lines etc, should reside in the config.json, but I digressed. 

I also used the config.json to hide certain UI features from production. For example, [https://afternoon-journey-1416.herokuapp.com/fault.html?debug=true] will show the search by date feature. In this way, we can stage release of new UI features by testing them thoroughly with real client data before put it in production. But you can use other mechanism. 

You can test the front end features by sending POST, PUT, PATCH or DELETE requests to the demo server for the 'faults' or 'heartbeats' data streams, for example: 

GET /api/faults?_sort=RecordTime&_order=DESC&_start=0_limit=20

And my front end code uses these standard REST APIs. Lyle, you may implement the paging function differently with 'offset', 'end', 'page' etc, but you get the idea. The front end code base is very small and clean and extremely easy to follow. You should be able to modify it easily for any backend API changes. 

That leads to my last point. I can't continuously maintain the front end code as new changes go through the WCG and the backend. I don't have the bandwidth now. I can fix bugs, if there is any, for the existing code, but I can't write new code for new features without being able to fully test it. The team has to make decision now whether to use my front end code as it is and build the exact backend APIs to match it or the other way around, that is, design some other UIs, which I can't due to other project commitment, to fit the backend as it goes.

Thanks,

Jun





