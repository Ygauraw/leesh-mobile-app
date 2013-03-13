
Ti.include("/struct/struct.js");

var controller = Stately.machine({
'NEW': {
	
    //startup
    'start': function () {
        S.app.mainWindow = S.ui.createApplicationWindow();
        S.app.mainWindow.open();
        //based upon settings
        //either return this.OBSERVE.active OR this.OBSERVE.passive
        return this.REPORT;
    }
    
},

'COUPLE': {
    
    //couple 2 or more devices to a peer group
    'connect': function(){
        //generate group id
        //give preliminary link to devices in peer group
        return this.COUPLE.giveRoles;
    },
    
    'giveRoles': function(){
        //allow each user to choose a role
        //be it observer, observed, or peer (mutual observation)
        //upon selection
        return this.COUPLE.confirm;
    },
    
    'confirm': function(){
        //show list of users in peer group with chosen roles listed
        //if unanimous confirmation, write roles to db
        //else show list again on all devices for those contested group members
        //with option to remove contested members from group, or cancel entirely
        //repeat if needed
    },
    
    'error': function(){
        //list coupling errors to group
    }
},

'OBSERVE': {
    
    //collecting info
    'active': function () {
        //get last report
        //get distance from last known
        //get bearing towards target from last known
        //display onscreen
        //update data
        //return this.REPORT appropriate to application settings;
    },
    
    'passive': function () {
        //get last report
        //get distance from last known
        //get bearing towards target from last known
        //display notification of update with distance and age of data
        //update data
        //return this.REPORT appropriate to application settings;
    }
},

'REPORT': {
    
    //refresh datastore
    'local': function(){
        //if it hasn't hapened too often or for too long
        //check location
        var currentPosition = geo.getCurrentPosition();
        //plot point in db
        var record = locations.newRecord({
		    timeStamp:			currentPosition.timestamp,	
		    latitude:          	currentPosition.latitude,
		    longitude:          currentPosition.longitude,
		    altitude:			currentPosition.altitude,
		    alltitudeAccuracy:	currentPosition.altitudeAccuracy,
		    heading:			currentPosition.heading, 			
		    accuracy:			currentPosition.accuracy, 			
		    speed:				currentPosition.speed
        });
        record.save();
        Ti.API.info( locations.count() );        
        //compare distance to last point
        var lastPosition = currentPosition.record.findById( record.id - 1 );
        var distanceTraveled = geolib.getDistance( currentPosition, lastPosition );
        
        //just for testing, normally we would test gainst the other phones in the group
        var northPole = { latitude: 90, longitude: 0 }
        
        var distanceFromNorthPole = geolib.getDistance( currentPosition, northPole );
        
        Ti.API.info( distanceFromNorthPole );
        
        //if any concern, issue warning()
        if( concern ) return this.WARN;
        //if error then go to error()
        if( error ) return this.error();
        //otherwise, go to ok()
        else return this.ok();
    },
    
    'remote': function(){
        //log unreported points in google geofence
        	//get last timestamp in remote
        	//go to appropriate point in db
        	//post the remaining local measurements from db to remote from point of last timestamp
        	
        //check location
        //var currentPosition = JSON.parse( geo.getCurrentPosition() );
        var currentPosition = Ti.Geolocation.getCurrentPosition( function( e ){ return e.coords; } );
        //plot point in db
        var record = locations.newRecord({
		    timeStamp:			currentPosition.timestamp,	
		    latitude:          	currentPosition.latitude,
		    longitude:          currentPosition.longitude,
		    altitude:			currentPosition.altitude,
		    alltitudeAccuracy:	currentPosition.altitudeAccuracy,
		    heading:			currentPosition.heading, 			
		    accuracy:			currentPosition.accuracy, 			
		    speed:				currentPosition.speed
        });
        record.save();
        Ti.API.info( locations.count() );  
                
        //if any concern, issue warning()
        //if error then go to error()
        //otherwise, go to ok()
    },
    
    'ok': function () {
        //update is just fine
        //if it has happened recently, go to wait
        if( true ) return this.WAIT; //@todo get to this if true...
        //return this.REPORT appropriate to application settings;
        else return this.REPORT;
    },
    
    'error': function () {
        //log and count error
        //if too many errors?
        //what kind of error is it?
        //what role is the current device?
        //any alternatives?
        //what was the circumstance of the user?
        //wait and retry, issue this.WARNING, or this.DANGER
        //return this.OBSERVING appropriate to application settings;
    }
},

'WARN': {
	//issue regular warning to group
	'warn': function(){
		//issue warning to group
			//is it:
				//too slow?
				//too fast?
				//too far?
				//off?
			//for any of the above
			//display stats of device that misses safety test
			//display confirm opportunity to notify authorities
			//or cancel
	}
},

'DANGER': {
    
    //notify authorities
    'notify': function(){}  
},

'WAIT': {
    
    //wait
    'wait': function(){
    	setinterval( function(){ return this.REPORT }, 3000 );
    }  
},

'SHUTDOWN': {
    
    'end': function(){
        //is this a surprise?
        //what role is this device?
        //if a surprise and device is target
        //hide view and revert to passive
        //is device being shut down
        //log and report
        //else clean up
    }    
}

});

controller.bind( function(){
	Ti.API.info( String( this.getMachineEvents() ) );
} );

controller.start();

controller.local();

// hypothitical implementation
// if( localAppropriate ){
    // controller.local();
// }else{
    // controller.remote();
// }
// 
// if( ok ){
    // controller.ok();
// }else{
    // controller.error();
// }

controller.end()
