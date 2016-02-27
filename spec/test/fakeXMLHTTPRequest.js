
function fakeXMLHTTPRequest() {
  this.responseText = fakeXMLHTTPRequest.responseText;
  this.open = function () {
  };
  this.onload = function () {
  };
  this.send = function () {
    this.onload();
  };

  return this;
}
fakeXMLHTTPRequest.responseText = '';
fakeXMLHTTPRequest.withResponse = function(text){
  this.responseText = text;
  return this;
};
