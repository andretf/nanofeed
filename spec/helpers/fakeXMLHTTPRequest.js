
function fakeXMLHTTPRequest() {
  this.responseText = fakeXMLHTTPRequest.responseText;
  this.status = fakeXMLHTTPRequest.status;
  this.open = function () {
  };
  this.onload = function () {
  };
  this.onerror = function () {
  };
  this.send = function () {
    if (fakeXMLHTTPRequest.status > 0) {
      this.onload();
    }
    else {
      this.onerror();
    }
  };

  return this;
}

fakeXMLHTTPRequest.responseText = '';
fakeXMLHTTPRequest.status = 200;

fakeXMLHTTPRequest.reset = function(){
  this.responseText = '';
  this.status = 200;
  return this;
};

fakeXMLHTTPRequest.setResponse = function(text){
  fakeXMLHTTPRequest.reset();
  this.responseText = text;
  return this;
};
fakeXMLHTTPRequest.setError = function() {
  this.status = 0;
  return this;
};
