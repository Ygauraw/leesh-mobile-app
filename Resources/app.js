
Ti.include("/struct/struct.js");

var controller = Stately.machine({
'NEW': {
	
    //startup
    'start': function () {
        S.app.mainWindow = S.ui.createApplicationWindow();
        S.app.mainWindow.open();
        //based upon settings
    	//based upon roles
    	//return this.OBSERVE
        //else
        //this.REPORT.remote() or local();
        //else this.COUPLE
        this.REPORT.local();
    }
    
},

'COUPLE': {
    
    //couple 2 or more devices to a peer group
    'connect': function(){
        //generate group id
        //give preliminary link to devices in peer group
        //if error
        //return this.COUPLE.error()
        //else
        this.COUPLE.giveRoles;
    },
    
    'giveRoles': function(){
        //allow each user to choose a role
        //be it observer, observed, or peer (mutual observation)
        //upon selection
        //if error
        //return this.COUPLE.error()
        //else
        this.COUPLE.confirm;
    },
    
    'confirm': function(){
        //show list of users in peer group with chosen roles listed
        //if unanimous confirmation, write roles to db
        //else show list again on all devices for those contested group members
        //with option to remove contested members from group, or cancel entirely
        //repeat if needed
        //if error
        //return this.COUPLE.error()
        //else
        //return this.OBSERVE
    },
    
    'error': function(){
        //list coupling errors to group
    }
},

'OBSERVE': {
    
    //collecting info
    'active': function () {
        //get last report from paired device
        //get distance from last known
        //get bearing towards target from last known
        //display onscreen
        //update data
        //return this.REPORT appropriate to application settings;
    },
    
    'passive': function () {
        //get last report from paired device
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
        //ask professionals what that might be...
        //check location
        //var currentPosition = JSON.parse( geo.getCurrentPosition() );
        Ti.Geolocation.getCurrentPosition( function( e ){ 
	        if( !!e.error ) this.REPORT.error( e.error );
	        //plot point in db
	        var record = locations.newRecord({
			    timeStamp:			e.coords.timestamp,	
			    latitude:          	e.coords.latitude,
			    longitude:          e.coords.longitude,
			    altitude:			e.coords.altitude,
			    alltitudeAccuracy:	e.coords.altitudeAccuracy,
			    heading:			e.coords.heading, 			
			    accuracy:			e.coords.accuracy, 			
			    speed:				e.coords.speed
	        });
	        record.save();
	        
            //compare distance to last point
            var whereWeAre = {
            	latitude: e.coords.latitude,
            	longitude: e.coords.longitude
            };
            
            var whereWeWere = locations.findOneById( record.id - 1 );
            
            if( whereWeWere != 'undefined' ){
	            var lastPosition = {
	            	latitude: whereWeWere.latitude,
	            	longitude: whereWeWere.longitude
	            };
		        var distanceTraveled = geolib.getDistance( whereWeAre, whereWeWere );
		        Ti.API.info( 'distance traveled is: ' + distanceTraveled );
		               	
            }else{
		        //just for testing, normally we would test gainst the other phones in the group
		        var northPole = { latitude: 90, longitude: 0 }
		        
		        var distanceFromNorthPole = geolib.getDistance( whereWeAre, northPole );
		        
		        Ti.API.info( 'distance from north pole is: ' + distanceFromNorthPole );
            }
            
	        
        } );
        Ti.API.info( 'locations count is: ' + locations.count() );         
        
        //if any concern, issue warning()
        //if( concern ) return this.WARN;
        //if error then go to error()
        //if( error ) return this.error();
        //otherwise, go to ok()
        //else return this.REPORT.ok();
        return this.WAIT; //@todo remove temp redirect
    },
    
    'remote': function(){
        //log unreported points in google geofence
        	//get last timestamp in remote
        	//go to appropriate point in db
        	//post the remaining local measurements from db to remote from point of last timestamp
        	
        //check location
        Ti.Geolocation.getCurrentPosition( function( e ){ 
	        if( !!e.error ) this.REPORT.error( e.error );
	        //plot point in db
	        var record = locations.newRecord({
			    timeStamp:			e.coords.timestamp,	
			    latitude:          	e.coords.latitude,
			    longitude:          e.coords.longitude,
			    altitude:			e.coords.altitude,
			    alltitudeAccuracy:	e.coords.altitudeAccuracy,
			    heading:			e.coords.heading, 			
			    accuracy:			e.coords.accuracy, 			
			    speed:				e.coords.speed
	        });
	        record.save();
        } );
        Ti.API.info( 'locations count is: ' + locations.count() );  
                
        //if any concern, issue warning()
        //if( concern ) return this.WARN;
        //if error then go to error()
        //if( error ) return this.error();
        //otherwise, go to ok()
        //else return this.REPORT.ok();
        return this.WAIT; //@todo remove temp redirect
        
    },
    
    'ok': function () {
        //update is just fine
        //if it has happened recently, go to wait
        if( true ) return this.WAIT; //@todo get to this if true...
        //return this.REPORT appropriate to application settings;
        else return this.REPORT;
    },
    
    'error': function ( error ) {
    	Ti.API.info( error );
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
    'danger': function(){}  
},

'WAIT': {
    
    //wait
    'wait': function(){
    	setTimeout( function(){ return this.REPORT.local.call( this ) }, 3000 );
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
	Ti.API.info( this.getMachineState() );
	//bind a Titanium event to the events of Stately
	//Ti.API.fireEvent( this.getMachineState() );
} );

controller.start();

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
