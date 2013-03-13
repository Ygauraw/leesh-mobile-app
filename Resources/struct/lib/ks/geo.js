function Geo() {

	Ti.Geolocation.purpose = 'peer tracking';

	this.translateErrorCode = function(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}
	//
	//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
	//
	this.isGeoOn = function() {
		if (Titanium.Geolocation.locationServicesEnabled === false) {
			Titanium.UI.createAlertDialog({
				title : 'leesh app notice',
				message : 'Your device has geo turned off - turn it on.'
			}).show();
		} else {
			var authorization = Titanium.Geolocation.locationServicesAuthorization;
			Ti.API.info('Authorization: ' + authorization);
			if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
				//@todo do something about auth denial
			} else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
				//@todo do something about auth restriction
			}
		}
	}
	//
	// IF WE HAVE COMPASS GET THE HEADING
	//
	this.isCompassOn = function() {
		if (Titanium.Geolocation.hasCompass) {
			//
			//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
			//
			Titanium.Geolocation.showCalibration = false;

			//
			// SET THE HEADING FILTER (THIS IS IN DEGREES OF ANGLE CHANGE)
			// EVENT WON'T FIRE UNLESS ANGLE CHANGE EXCEEDS THIS VALUE
			Titanium.Geolocation.headingFilter = 90;

			//
			//  GET CURRENT HEADING - THIS FIRES ONCE
			//
			Ti.Geolocation.getCurrentHeading(function(eventObject) {
				if (eventObject.error) {
					currentHeading.text = 'error: ' + eventObject.error;
					Ti.API.info("Code translation: " + translateErrorCode(eventObject.code));
					return;
				}
				var x = eventObject.heading.x;
				var y = eventObject.heading.y;
				var z = eventObject.heading.z;
				var magneticHeading = eventObject.heading.magneticHeading;
				var accuracy = eventObject.heading.accuracy;
				var trueHeading = eventObject.heading.trueHeading;
				var timestamp = eventObject.heading.timestamp;

				currentHeading.text = 'x:' + x + ' y: ' + y + ' z:' + z;
				Titanium.API.info('geo - current heading: ' + new Date(timestamp) + ' x ' + x + ' y ' + y + ' z ' + z);
			});
		}
		//
		// EVENT LISTENER FOR COMPASS EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON HEADING FILTER)
		//
		var headingCallback = function(eventObject) {
			if (eventObject.error) {
				updatedHeading.text = 'error: ' + eventObject.error;
				Ti.API.info("Code translation: " + translateErrorCode(eventObject.code));
				return;
			}

			var x = eventObject.heading.x;
			var y = eventObject.heading.y;
			var z = eventObject.heading.z;
			var magneticHeading = eventObject.heading.magneticHeading;
			var accuracy = eventObject.heading.accuracy;
			var trueHeading = eventObject.heading.trueHeading;
			var timestamp = eventObject.heading.timestamp;

			return eventObject;
		}
	}
	//
	//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	//
	// Titanium.Geolocation.ACCURACY_BEST
	// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
	// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
	// Titanium.Geolocation.ACCURACY_KILOMETER
	// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
	//
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//

	this.getCurrentPosition = function() {
		Titanium.Geolocation.getCurrentPosition(function(eventObject) {
			if (!eventObject.success || eventObject.error) {
				currentLocation.text = 'error: ' + JSON.stringify(eventObject.error);
				Ti.API.info("Code translation: " + translateErrorCode(eventObject.code));
				alert('error ' + JSON.stringify(eventObject.error));
				return;
			}
			Ti.API.info( JSON.stringify( eventObject.coords ) );
			return JSON.stringify( eventObject.coords );
		});
	}
	//
	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	//@todo figure out the difference betwixt the Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS and this setting
	Titanium.Geolocation.distanceFilter = 10;

	//
	// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
	//
	function locationCallback(eventObject) {
		//Mobileweb seems to be not firing window event for some odd reason.
		if (!eventObject.success || eventObject.error) {
			updatedLocation.text = 'error:' + JSON.stringify(eventObject.error);
			updatedLatitudeventObject.text = '';
			updatedLocationAccuracy.text = '';
			updatedLocationTimeventObject.text = '';
			Ti.API.info("Code translation: " + translateErrorCode(eventObject.code));
			return;
		}

		var longitude = eventObject.coords.longitude;
		var latitude = eventObject.coords.latitude;
		var altitude = eventObject.coords.altitude;
		var heading = eventObject.coords.heading;
		var accuracy = eventObject.coords.accuracy;
		var speed = eventObject.coords.speed;
		var timestamp = eventObject.coords.timestamp;
		var altitudeAccuracy = eventObject.coords.altitudeAccuracy;

		Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	};
	//Titanium.Geolocation.addEventListener('location', locationCallback);

	this.forwardGeocoder = function(addr) {

		Titanium.Geolocation.forwardGeocoder(addr, function(evt) {
			Ti.API.info('in forward ');
			forwardGeo.text = "lat:" + evt.latitude + ", long:" + evt.longitude;
			Titanium.Geolocation.reverseGeocoder(evt.latitude, evt.longitude, function(evt) {
				if (evt.success) {
					var text = "";
					for (var i = 0; i < evt.places.length; i++) {
						text += "" + i + ") " + evt.places[i].address + "\n";
					}
					Ti.API.info('Reversed forward: ' + text);
				} else {
					Ti.UI.createAlertDialog({
						title : 'Forward geo error',
						message : evt.error
					}).show();
					Ti.API.info("Code translation: " + translateErrorCode(eventObject.code));
				}
			});
		});
	}
}

module.exports = Geo;
