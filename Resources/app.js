
Ti.include("/struct/struct.js");

var controller = Stately.machine({
NEW: {
    //startup
    start: function () {
        S.app.mainWindow = S.ui.createApplicationWindow();
        S.app.mainWindow.open();
        //based upon settings
        //either return this.OBSERVING.active OR this.OBSERVING.passive
    }
},

OBSERVE:{
    
    //collecting info
    active: function () {
        //get last report
        //get distance from last known
        //get bearing towards target from last known
        //display onscreen
        //update data
        //return this.CHECKIN appropriate to application settings;
    },
    
    passive: function () {
        //get last report
        //get distance from last known
        //get bearing towards target from last known
        //display notification of update with distance and age of data
        //update data
        //return this.CHECKIN appropriate to application settings;
    }
},

REPORT: {
    
    //refresh datastore
    local: function(){
        //if it hasn't hapened too often or for too long
        //check location
        //plot point in db
        //compare distance to last point
        //if any concern, issue warning()
        //if error then go to error()
        //otherwise, go to ok()
    },
    
    remote: function(){
        //check location
        //plot point in db
        //log unreported points in google geofence
        //if any concern, issue warning()
        //if error then go to error()
        //otherwise, go to ok()
    },
    
    ok: function () {
        //update is just fine
        //return this.OBSERVING appropriate to application settings;
    },
    
    error: function () {
        //log and count error
        //if too many errors?
        //what kind of error is it?
        //what role is the current device?
        //any alternatives?
        //what was the circumstance of the user?
        //wait and retry, issue warning, or this.DANGER
        //return this.OBSERVING appropriate to application settings;
    },

},

DANGER: {
    //notify authorities
    notify: function(){}
},

WAIT: {
    //wait
    wait: function(){}
},

SHUTDOWN: {
    end: function(){
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

controller.start();

if( localAppropriate ){
    controller.local();
}else{
    controller.remote();
}

if( ok ){
    controller.ok();
}else{
    controller.error();
}

controller.end()