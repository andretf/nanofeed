'use strict';

describe("Parameter", function () {
  var successCallback;
  var callFn;

  describe("Urls", function () {
    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      callFn = function (url, testResponse) {
        var request = fakeXMLHTTPRequest.reset()
          .withResponse(testResponse || TestResponse.withResults.fields.default);
        nanofeed.fetch.call(getContextWithFakeRequest(request), url, successCallback);
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

  describe("(Given) Callback", function(){
    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      callFn = function (callback) {
        var args = [urls.valid.string, callback];
        var request = fakeXMLHTTPRequest.reset().withResponse(TestResponse.withResults.fields.default);
        return nanofeed.fetch.apply(getContextWithFakeRequest(request), args);
      }
    });

    it("(When) omitted (then) should throw exception", function(){
      expect(callFn.bind(this)).toThrow();
    });
    it("(When) undefined (then) should throw exception", function(){
      expect(callFn.bind(this, undefined)).toThrow();
    });
    it("(When) null (then) should throw exception", function(){
      expect(callFn.bind(this, null)).toThrow();
    });
    it("(When) other than a function (then) should throw exception", function(){
      expect(callFn.bind(this, 0)).toThrow();
      expect(callFn.bind(this, new Date)).toThrow();
      expect(callFn.bind(this, "")).toThrow();
      expect(callFn.bind(this, {})).toThrow();
    });

    it("(When) function (then) should not throw exception", function(){
      expect(callFn.bind(this, function(){})).not.toThrow();
    });
  });
});

describe("Successful result from call to Yahoo! API", function () {
  var successCallback = jasmine.createSpy('successCallback');
  var args;

  function getNanoResults(testResponse){
    nanofeed.fetch.apply(getContextWithFakeResponse(testResponse), args);
    return getCallbackParam(successCallback);
  }

  beforeEach(function () {
    successCallback = jasmine.createSpy('successCallback');
    args = [urls.valid.string, successCallback];
  });

  it("should retrieve feed entries for valid urls", function () {
    var data = getNanoResults(TestResponse.withResults.fields.default);
    expect(data).toBeDefined();
    expect(data.length).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  describe("Count", function () {
    it("should not be greater than options.qty", function () {
      var data = getNanoResults(TestResponse.withResults.fields.default);
      expect(data).toBeDefined();
      expect(data.length).toBeDefined();
      expect(data.length).not.toBeGreaterThan(10);
    });
  });

  describe("Format", function () {
    describe("When: valid JSON", function() {
      describe("should call callback function", function () {
        describe("when: data is valid (has property query.results.results) ", function () {
          function callNano(testResponse){
            nanofeed.fetch.apply(getContextWithFakeResponse(testResponse), args);
            expect(successCallback).toHaveBeenCalled();
          }
          it("When: there is no items, should pass empty array", function () {
            callNano(TestResponse.noResult);
            expect(getCallbackParam(successCallback).length).toBe(0);
          });
          it("When: there is one item, should pass object in an array", function () {
            callNano(TestResponse.withResults.oneResult);
            expect(getCallbackParam(successCallback).length).toBe(1);
          });
          it("When: there are more than one items, should pass them in array", function () {
            callNano(TestResponse.withResults.fields.default);
            expect(getCallbackParam(successCallback).length).toBe(2);
          });
        });
      });

      describe("should not call callback function", function () {
        it("when: data is invalid (syntax error in query sent to API)", function () {
          nanofeed.fetch.apply(getContextWithFakeResponse(TestResponse.errorJson), args);
          expect(successCallback).not.toHaveBeenCalled();
        });
      });
    });

    describe("when: invalid JSON", function(){
      it("should not throw exceptions", function(){
        function callNano(testResponse) {
          return nanofeed.fetch.bind(getContextWithFakeResponse(testResponse), args);
        }
        expect(callNano(TestResponse.empty)).not.toThrow();
        expect(callNano(TestResponse.html)).not.toThrow();
        expect(callNano(TestResponse.xml)).not.toThrow();
        expect(callNano(TestResponse.rss)).not.toThrow();
        expect(callNano(TestResponse.json)).not.toThrow();
        expect(callNano(TestResponse.errorJson)).not.toThrow();
      });

      it("should not call callback function", function(){
        function callNano(testResponse) {
          nanofeed.fetch.apply(getContextWithFakeResponse(testResponse), args);
          return {successCallback: successCallback};
        }
        expect(callNano(TestResponse.empty).successCallback).not.toHaveBeenCalled();
        expect(callNano(TestResponse.html).successCallback).not.toHaveBeenCalled();
        expect(callNano(TestResponse.xml).successCallback).not.toHaveBeenCalled();
        expect(callNano(TestResponse.rss).successCallback).not.toHaveBeenCalled();
        expect(callNano(TestResponse.json).successCallback).not.toHaveBeenCalled();
        expect(callNano(TestResponse.errorJson).successCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe("Data type of fields", function() {
    var item;
    var options = {
      title: true,
      link: true,
      date: true,
      description: true
    };
    beforeEach(function(){
      nanofeed.fetch.call(getContextWithFakeResponse(TestResponse.withResults.fields.all),
        urls.valid.string, options, successCallback);
      expect(successCallback).toHaveBeenCalled();
      item = getCallbackParam(successCallback).first();
    });
    afterEach(function(){
      item = undefined;
    });

    it("'title' should be in text format", function () {
      expect(item.title).toBeDefined();
      expect(item.title).toEqual(jasmine.any(String));
    });
    it("'link' should be in text format", function () {
      expect(item.link).toBeDefined();
      expect(item.link).toEqual(jasmine.any(String));
    });
    it("'pubDate' should be in date format", function () {
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

    function getFirstNanoResult(response, options){
      var args = [urls.valid.string, options, successCallback];
      nanofeed.fetch.apply(getContextWithFakeResponse(response), args);
      expect(successCallback).toHaveBeenCalled();
      return getCallbackParam(successCallback).first();
    }

    beforeEach(function(){
      fakeXMLHTTPRequest.reset();
    });

    describe("When required in options (field: true)", function() {
      it("should have 'title' when required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all,
          { title: true });
        expect(item.title).toBeDefined();
      });
      it("should have 'link' when required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all,
          { link: true });
        expect(item.link).toBeDefined();
      });
      it("should have 'pubDate' when required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all,
          { pubDate: true });
        expect(item.pubDate).toBeDefined();
      });
      it("should have 'description' when required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all,
          { description: true });
        expect(item.description).toBeDefined();
      });
    });
    describe("When not required in options (field: false)", function() {
      it("should not have 'title' when not required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none,
          { title: false, link: true });
        expect(item.title).toBeUndefined();
      });
      it("should not have 'link' when not required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none,
          { title: true, link: false });
        expect(item.link).toBeUndefined();
      });
      it("should not have 'pubDate' when not required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none,
          { title: true, pubDate: false });
        expect(item.pubDate).toBeUndefined();
      });
      it("should not have 'description' when not required", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none,
          { title: true, description: false });
        expect(item.description).toBeUndefined();
      });
    });
    describe("Defaults", function() {
      it("should have 'title'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.default, {});
        expect(item.title).toBeDefined();
      });
      it("should have 'link'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.default, {});
        expect(item.link).toBeDefined();
      });
      it("should not have 'pubDate'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.default, {});
        expect(item.pubDate).toBeUndefined();
      });
      it("should not have 'description'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.default, {});
        expect(item.description).toBeUndefined();
      });
      it("should have 'title' as default, even when not required, when all fields are not required", function () {
        var options = {title: false, link: false, date: false, description: false};
        item = getFirstNanoResult(TestResponse.withResults.fields.onlyTitle, options);
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
    nanofeed.fetch.call(getContextWithFakeRequest(fakeRequest), urls.valid.string, successCallback);
  });

  it("should not throw exceptions", function(){
    expect(successCallback).not.toThrow();
  });

  it("should not call callback function", function(){
    expect(successCallback).not.toHaveBeenCalled();
  });
});
