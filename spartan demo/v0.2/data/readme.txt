Hi all,

I have set up a test site for both the backend and the front end.

[url]

Phil, you can use the site to test WCG messages. Send you post request to [url] and [ulr] for the heartbeat and fault event respectively. Refresh the webpage to see the updates. You can use 01-05 as the "DeviceName" when constructing message.

Please note that the server uses in-memory database so its contents are not persisted to disk. Everytime the server re-start, you start with some clean simulated data, which is good for debugging purposes.

Also, there some typos in your [doc] about the data format, missing some quotaion and comma somewhere. Please check [url] as your reference for the data format.

Ernie, please take a close look at the website, which consists of three webpages. And that's what we will have for trial. Please sign off the design after you review it. Any additional UI features that require new WCG functions or backend support, in my opinion, is un-realistic at this point. The feature set needs to be frozen by this week to leave enough time for tuning and debugging the whole system.

Lyle and [], I am responsible for the front UI and this will be my deliverable [url]. Simply unzip the file and deploy the directory under the www root. Since all  files are static HTML5 and javascript, no additional server integration is needed. All is ready to go, except the config.json (see [url]), which has the list of the device names and the heartbeat rate. You need modified it according to the information that will be hard coded in the firmware with each individual WCG. 

You can test the front end by sending POST, PUT, PATCH or DELETE requests to the demo server for the 'faults' or 'heartbeats' data streams, for example: 

GET /api/faults?_sort=RecordTime&_order=DESC&_start=0_limit=20

And these STANDARD REST APIs are being used in the front end code. Lyle, you may implement the paging function differently with 'offset', 'end', 'page', but you get the idea. The front end code is clean and small and extremely easy to follow. You should be able to modify it accordingly for any backend changes.

That leads to my main point. I can't continuously maintain the front end code as changes go through the WCGs and the backend. I don't have the bandwidth now.  The team has to make decision now whether to use my code as it is and build the exact backend APIs to support it or come up with some other UIs to fit the backend as it goes.





