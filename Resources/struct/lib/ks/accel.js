//simply return the status of the accelerometer
//what to do with it?? Hmm...
function accel() {
	Ti.Accelerometer.addEventListener( 'update', function( eventObject ){		
		return eventObject;
	} );
};