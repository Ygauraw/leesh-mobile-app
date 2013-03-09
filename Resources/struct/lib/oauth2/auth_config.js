/* Init Auth Module */
//dummy values for the moment
var superAuth = AuthModule.init({
  client_id:       "your_client_id",
  client_secret:   "your_client_secret",
  redirect_uri:    "http://your_redirect_uri:3000/",
  auth_server_url: "http://your_auth_server_url:3000/"
});

/* Create a request to your resource server */
var updateMap = new Request({
    method: 'POST',
    url:    'https://www.googleapis.com/tracks/v1/',
    ext:    {
      first_name: "Vito",
      last_name:  "Corleone"
    }
});

/* Set your own onload and onerror methods */
updateMap.xhr.onload = function(e) {
  // do something
  /* Set request as done */
  updateMap.setAsDone();
}
updateMap.xhr.error = function(e) {
  // do something
  /* Set request as done */
  updateMap.setAsDone();
}

/* Send the request (this will start max. 3 clients and it will queue all other request till user is authorized */
RequestCountLimiter.add(updateMap);
RequestCountLimiter.checkState();