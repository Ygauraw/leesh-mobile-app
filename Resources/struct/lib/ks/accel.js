//simply return the status of the accelerometer
//what to do with it?? Hmm...
function accelerometer() {
	Ti.Accelerometer.addEventListener( 'update', function( eventObject ){		
		return eventObject;
	} );
};

module.exports = accelerometer;