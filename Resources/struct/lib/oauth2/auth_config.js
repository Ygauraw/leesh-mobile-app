/* Init Auth Module */
var superAuth = AuthModule.init({
  client_id:       "your_client_id",
  client_secret:   "your_client_secret",
  redirect_uri:    "http://your_redirect_uri:3000/",
  auth_server_url: "http://your_auth_server_url:3000/"
});

/* Create a request to your resource server */
var updateMap = new Request({
    method: 'POST',
    url:    'http://your_resource_server_url/personal/details',
    ext:    {
      first_name: "Vito",
      last_name:  "Corleone"
    }
});

/* Set your own onload and onerror methods */
updateMyName.xhr.onload = function(e) {
  // do something
  /* Set request as done */
  updateMyName.setAsDone();
}
updateMyName.xhr.error = function(e) {
  // do something
  /* Set request as done */
  updateMyName.setAsDone();
}

/* Send the request (this will start max. 3 clients and it will queue all other request till user is authorized */
RequestCountLimiter.add(updateMyName);
RequestCountLimiter.checkState();