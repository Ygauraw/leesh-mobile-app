# leesh Mobile App.

The core function of the app is to notify users when one group device is too far from the others in the group.

Technology used is Javascript on a Titanium Mobile development stack for both Android and iOS with local and cloud tracked geofencing. Geomath provided by local calculation confirmed by the Google Maps Tracks API.

This project uses the struct MVC project structure with joli.js as an ORM model and Stately.js for a controller.

***
More docs to come, but if you are going to use this project as a base be aware of the following files and directories:

* Resources/app.js
	This is the controller implemented with a Stately.js state machine.
* Resources/struct/struct.js
	This file pulls in the following:
	* Resources/struct/lib/lib.js - this file pulls in many other files important to this application
	* Resources/struct/model/model.js - this file pulls joli.js models
	* Resources/struct/ui/ui.js - this file sets up an environment window and pulls views at the bottom 

These files pull other files in and are the basis of the inclusion tree.
***

### If you want to learn this project as a base for your own, pay close attention to the documentation at the following projects:

* https://github.com/xavierlacot/joli.js/
* https://github.com/fschaefer/Stately.js
* https://github.com/krawaller/Struct

A humble thanks to them for their work.

***


Currently in alpha development for completion in May 2013.