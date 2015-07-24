
##Server and Web Application
The server application is running on Microsoft's Azure cloud platform. Open a web browser (prefer Chrome) and go to http://mmmesl.azurewebsites.net/ 

The first page shows a sample log of check in/out events with dummy data.

![](http://localhost:3000/help/log.png)


Click on the assets link. This is the page you will see a list of assets
![](http://localhost:3000/help/assets.png)

and you will get the door open alert on this page too.
![](http://localhost:3000/help/alert.png)


Please note that the buttons on the pages are for demo purposes only.


Click on the users link. On this page, you will see a list of users.
![](http://localhost:3000/help/user.png)

Again, they are dummy data for demo purposes only.



## Phone App
Tap "3M access" icon to open the phone app. After you log in (the user name and password are not verified), you will see the app has two basic functions, check-in and check-out. If there is any network problem to the server, the login will fail.
![](http://localhost:3000/help/phone.png)


Tap the check-in button to open the door. It will prompt you to place the phone over the marked location on the cabinet. If successful, you will hear a click sound as well as see the light goes off. On the phone screen, you will see a briefly displayed text box showing that the door is opened. 

If the bowser is at the assets page, you will see the alert message as shown in previous figure.

After a successful check-in, the phone app shows a list of button that are place holders for future development. You can ignore them for this demo.

To lock the door, go back to the previous screen and tap the check-out button. It will prompt you again to place the phone on the cabinet. Before doing that, though, you need to hold the cabinet door in close position. If the check-out is successful, you will hear a click sound as well as see the light turns on. On the phone screen, again you will see a briefly displayed text box showing that the door is closed.

The check-in and check-out events will be logged at the server and displayed on the home page of the web application.

## Help

If you have any trouble showing the demo, please contact jxiao@mmm.com

