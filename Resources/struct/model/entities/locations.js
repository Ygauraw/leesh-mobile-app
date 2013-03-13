var locations = new joli.model({
  table:    'locations',
  columns:  {
    id:                 'INTEGER PRIMARY KEY AUTOINCREMENT',
    timeStamp:			'TEXT',  			//var timestamp = eventObject.coords.timestamp;	
    latitude:          	'TEXT',  			//var latitude = eventObject.coords.latitude;
    longitude:          'TEXT',  			//var longitude = eventObject.coords.longitude;
    altitude:			'TEXT',				//var altitude = eventObject.coords.altitude;
    alltitudeAccuracy:	'TEXT',				//var altitudeAccuracy = eventObject.coords.altitudeAccuracy;
    heading:			'TEXT',  			//var heading = eventObject.coords.heading; 			
    accuracy:			'TEXT',				//var accuracy = eventObject.coords.accuracy; 			
    speed:				'TEXT'				//var speed = eventObject.coords.speed;
  }                              			
});                              			