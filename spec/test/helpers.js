// This script intends to add abstraction
// by encapsulating technical code, with friendly namings,
// to improve readability of specification
'use strict';

if (!Array.prototype.first){
  Array.prototype.first = function(){
    if (!this.length){
      return this;
    }
    return this[0];
  };
}

function mock(customFake) {
  window.XMLHttpRequest = customFake || fakeXMLHTTPRequest.reset();
}

function getContextWithFakeResponse(response) {
  var thisArg = window;
  thisArg.XMLHttpRequest = fakeXMLHTTPRequest.withResponse(response);
  return thisArg;
}
function getContextWithFakeRequest(fakeXMLHTTPRequest) {
  var thisArg = window;
  thisArg.XMLHttpRequest = fakeXMLHTTPRequest;
  return thisArg;
}

function getCallbackParam(successCallback){
  return (successCallback.calls.mostRecent() || {args: []}).args[0]
}

