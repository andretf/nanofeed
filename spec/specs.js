'use strict';

describe("Parameter", function () {

  describe("Urls", function () {
    var successCallback;
    var callFn;

    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      callFn = function (url, testResponse) {
        var request = fakeXMLHTTPRequest.reset()
          .withResponse(testResponse || TestResponse.withResults.fields.default);
        NanoFeed.call(getContextWithFakeRequest(request), url, successCallback);
        return {
          spy: successCallback,
          callbackData: (successCallback.calls.mostRecent() || {args: []}).args[0]
        }
      }
    });

    describe("When: data type is not string or string-array ", function() {
      it("should not try to retrieve feed for any data type except string or string-array", function () {
        expect(callFn(urls.invalid.null).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.undefined).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.function).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.object).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.number).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.regexp).spy).not.toHaveBeenCalled();
        expect(callFn(urls.invalid.arrayEmpty).spy).not.toHaveBeenCalled();
        // TODO: expect(urls.invalid.arrayNotString.success).toBe(false);
      });
    });

    describe("When: data type is string or string-array ", function(){
      function callFnNoResults (url) {
        return callFn(url, TestResponse.noResult);
      }

      it("should call callback function", function () {
        expect(callFnNoResults(urls.invalid.string).spy).toHaveBeenCalled();
        expect(callFnNoResults(urls.invalid.stringArray).spy).toHaveBeenCalled();
        expect(callFn(urls.valid.string).spy).toHaveBeenCalled();
        expect(callFn(urls.valid.stringArray).spy).toHaveBeenCalled();
      });

      it("should return empty array for invalid feed urls", function () {
        expect(callFnNoResults(urls.invalid.string).callbackData.length).toBe(0);
        expect(callFnNoResults(urls.invalid.stringArray).callbackData.length).toBe(0);
      });

      it("should return array of feed entries for valid feed urls", function () {
        expect(callFn(urls.valid.string).callbackData.length).toBe(2);
        expect(callFn(urls.valid.stringArray).callbackData.length).toBe(2);
      });
    });
  });
});

describe("Successful result from call to Yahoo! API", function () {
  var successCallback = jasmine.createSpy('successCallback');
  var fakeRequest;
  var options = {
    title: true,
    link: true,
    date: true,
    description: true,
    qty: 2
  };
  function callWithResponse (testResponse){
    var request = fakeXMLHTTPRequest.withResponse(testResponse);
    NanoFeed.call(getContextWithFakeRequest(request), urls.valid.string, successCallback);
    return {
      spy: successCallback,
      callbackData: (successCallback.calls.mostRecent() || {args: []}).args[0]
    }
  }

  beforeEach(function () {
    fakeRequest = fakeXMLHTTPRequest.reset();
    successCallback = jasmine.createSpy('successCallback');
  });

  it("should be valid data for valid urls", function () {
    var data = callWithResponse(TestResponse.withResults.fields.default).callbackData;
    expect(data).toBeDefined();
    expect(data.length).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  describe("Count", function () {
    it("should be equal to options.qty", function () {
      var data = callWithResponse(TestResponse.withResults.fields.default).callbackData;
      expect(data).toBeDefined();
      expect(data.length).toBeDefined();
      expect(data.length).toBe(options.qty);
    });
  });

  describe("Format", function () {
    var successCallback;
    var fakeRequest = fakeXMLHTTPRequest.reset();
    function callWithResponse (testResponse){
      var request = fakeRequest.withResponse(testResponse);
      NanoFeed.call(getContextWithFakeRequest(request), urls.valid.string, successCallback);
      return successCallback;
    }

    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
    });

    describe("When: valid JSON", function() {
      describe("should call callback function", function () {
        describe("when: data is valid (has property query.results.results) ", function () {
          xit("When: there is no items, should pass empty array", function () {
            callWithResponse(TestResponse.noResult);
            expect(successCallback).toHaveBeenCalled();
            expect(successCallback.calls.mostRecent().args[0].length).toBe(0);
          });
          it("When: there is one item, should pass object in an array", function () {
            callWithResponse(TestResponse.withResults.oneResult);
            expect(successCallback).toHaveBeenCalled();
            expect(successCallback.calls.mostRecent().args[0].length).toBe(1);
          });
          it("When: there are more than one items, should pass them in array", function () {
            callWithResponse(TestResponse.withResults.fields.default);
            expect(successCallback).toHaveBeenCalled();
            expect(successCallback.calls.mostRecent().args[0].length).toBe(2);
          });
        });
      });

      describe("should not call callback function", function () {
        it("when: data is invalid (syntax error in query sent to API)", function () {
          callWithResponse(TestResponse.errorJson);
          expect(successCallback).not.toHaveBeenCalled();
        });
      });
    });

    xdescribe("when: invalid JSON", function(){
      it("should not throw exceptions", function(){
        expect(callWithResponse(TestResponse.empty)).toThrow();
        expect(callWithResponse(TestResponse.html)).toThrow();
        expect(callWithResponse(TestResponse.xml)).not.toThrow();
        expect(callWithResponse(TestResponse.rss)).not.toThrow();
        expect(callWithResponse(TestResponse.json)).not.toThrow();
        expect(callWithResponse(TestResponse.errorJson)).not.toThrow();
      });

      it("should not call callback function", function(){
        expect(callWithResponse(TestResponse.empty)).not.toHaveBeenCalled();
        expect(callWithResponse(TestResponse.html)).not.toHaveBeenCalled();
        expect(callWithResponse(TestResponse.xml)).not.toHaveBeenCalled();
        expect(callWithResponse(TestResponse.rss)).not.toHaveBeenCalled();
        expect(callWithResponse(TestResponse.json)).not.toHaveBeenCalled();
        expect(callWithResponse(TestResponse.errorJson)).not.toHaveBeenCalled();
      });
    });
  });

  describe("Data type of fields", function() {
    var item = callWithResponse(TestResponse.withResults.fields.all).callbackData[0];

    it("'title' should be in text format", function () {
      expect(item.title).toBeDefined();
      expect(item.title).toEqual(jasmine.any(String));
    });
    it("'link' should be in text format", function () {
      expect(item.link).toBeDefined();
      expect(item.link).toEqual(jasmine.any(String));
    });
    xit("'pubDate' should be in date format", function () {
      expect(item.pubDate).toBeDefined();
      expect(item.pubDate).toEqual(jasmine.any(Date));
    });
    it("'description' should be in text format", function () {
      expect(item.description).toBeDefined();
      expect(item.description).toEqual(jasmine.any(String));
    });
  });

  describe("Presence of field", function() {
    var item;
    describe("When required in options (field: true)", function() {
      beforeEach(function(){
        item = callWithResponse(TestResponse.withResults.fields.all).callbackData[0];
      });
      it("should have 'title' when required", function () {
        expect(item.title).toBeDefined();
      });
      it("should have 'link' when required", function () {
        expect(item.link).toBeDefined();
      });
      it("should have 'pubDate' when required", function () {
        expect(item.pubDate).toBeDefined();
      });
      it("should have 'description' when required", function () {
        expect(item.description).toBeDefined();
      });
    });
    describe("When not required in options (field: false)", function() {
      beforeEach(function(){
        item = callWithResponse(TestResponse.withResults.fields.none).callbackData[0];
      });

      it("should not have 'title' when not required", function () {
        expect(item.title).toBeUndefined();
      });
      it("should not have 'link' when not required", function () {
        expect(item.link).toBeUndefined();
      });
      it("should not have 'pubDate' when not required", function () {
        expect(item.pubDate).toBeUndefined();
      });
      it("should not have 'description' when not required", function () {
        expect(item.description).toBeUndefined();
      });
    });

    describe("Defaults", function() {
      var item;
      beforeEach(function(){
        item = callWithResponse(TestResponse.withResults.fields.default).callbackData[0];
      });
      it("should have 'title'", function () {
        expect(item.title).toBeDefined();
      });
      it("should have 'link'", function () {
        expect(item.link).toBeDefined();
      });
      it("should have 'pubDate'", function () {
        expect(item.pubDate).toBeUndefined();
      });
      it("should have 'description'", function () {
        expect(item.description).toBeUndefined();
      });
      it("should have 'title' as default, even when not required, when all fields are not required", function () {
        item = callWithResponse(TestResponse.withResults.fields.onlyTitle).callbackData[0];
        expect(item.title).toBeDefined();
      });
    });
  });
});

describe("Unsuccessful call to Yahoo! API", function () {
  var successCallback;

  beforeEach(function(){
    successCallback = jasmine.createSpy('successCallback');
    var fakeRequest = fakeXMLHTTPRequest.reset()
                      .withError()
                      .withResponse(urls.valid.string);
    NanoFeed.call(getContextWithFakeRequest(fakeRequest), urls.valid.string, successCallback);
  });

  it("should not throw exceptions", function(){
    expect(successCallback).not.toThrow();
  });

  it("should not call callback function", function(){
    expect(successCallback).not.toHaveBeenCalled();
  });
});
