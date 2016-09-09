'use strict';

describe("Parameter", function () {
  var successCallback;
  var callFn;

  describe("Urls", function () {
    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      callFn = function (url, testResponse) {
        fakeXMLHTTPRequest.setResponse(testResponse || TestResponse.withResults.fields.default);
        nanofeed.fetch(url, successCallback);
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

  describe("(Given) Options ", function() {
    beforeEach(function () {
      successCallback = jasmine.createSpy('successCallback');
      fakeXMLHTTPRequest.setResponse(TestResponse.withResults.fields.default);
      callFn = function (options) {
        nanofeed.fetch(urls.valid.string, options, successCallback);
        return getCallbackParam(successCallback).first();
      }
    });

    describe("(When) ommited (Then), as default", function () {
      var item;

      beforeEach(function () {
        successCallback = jasmine.createSpy('successCallback');
        fakeXMLHTTPRequest.setResponse(TestResponse.withResults.fields.default);
        nanofeed.fetch(urls.valid.string, successCallback);
        item = getCallbackParam(successCallback).first();
      });
      afterEach(function () {
        item = undefined;
      });

      it("should have 'title' field", function () {
        expect(item.title).toBeDefined();
      });
      it("should have 'link' field", function () {
        expect(item.link).toBeDefined();
      });
      it("should not have 'pubDate' field", function () {
        expect(item.pubDate).toBeUndefined();
      });
      it("should not have 'description' field", function () {
        expect(item.description).toBeUndefined();
      });
    });
  });

  describe("(Given) Callback", function(){
    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      fakeXMLHTTPRequest.setResponse(TestResponse.withResults.fields.default);
      callFn = function (callback) {
        return nanofeed.fetch.bind(nanofeed, urls.valid.string, callback);
      }
    });

    it("(When) omitted (then) should throw exception", function(){
      expect(nanofeed.fetch.bind(nanofeed, urls.valid.string)).toThrow();
    });
    it("(When) undefined (then) should throw exception", function(){
      expect(callFn(undefined)).toThrow();
    });
    it("(When) null (then) should throw exception", function(){
      expect(callFn(null)).toThrow();
    });
    it("(When) other than a function (then) should throw exception", function(){
      expect(callFn(0)).toThrow();
      expect(callFn(new Date)).toThrow();
      expect(callFn("")).toThrow();
      expect(callFn({})).toThrow();
    });

    it("(When) function (then) should not throw exception", function(){
      expect(callFn(function(){})).not.toThrow();
    });
  });
});

describe("nanofeed.options", function () {
  var successCallback;

  function getNanoResults(testResponse, customOptions){
    successCallback = jasmine.createSpy('successCallback');
    fakeXMLHTTPRequest.setResponse(testResponse);

    if (customOptions) {
      nanofeed.fetch(urls.valid.string, customOptions, successCallback);
    }
    else {
      nanofeed.fetch(urls.valid.string, successCallback);
    }

    return getCallbackParam(successCallback);
  }

  it("should be used as options on all after calls", function () {
    nanofeed.options.qty = 1;
    var data = getNanoResults(TestResponse.withResults.oneResult);
    expect(data.length).toBe(nanofeed.options.qty);
  });

  it("should be lower precedence than parameter options on nano.fetch", function () {
    nanofeed.options.qty = 3;
    var customQty = 1;
    var data = getNanoResults(TestResponse.withResults.oneResult,
                              { qty: customQty });
    expect(data.length).toBe(customQty);
  });
});

describe("Successful result from call to Yahoo! API", function () {
  var successCallback;

  function getNanoResults(testResponse){
    successCallback = jasmine.createSpy('successCallback');
    fakeXMLHTTPRequest.setResponse(testResponse);
    nanofeed.fetch(urls.valid.string, successCallback);
    return getCallbackParam(successCallback);
  }

  it("should retrieve feed entries for valid urls", function () {
    var data = getNanoResults(TestResponse.withResults.fields.default);
    expect(successCallback).toHaveBeenCalled();
    expect(data).toBeDefined();
    expect(data.length).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  describe("Count", function () {
    it("should not be greater than options.qty", function () {
      var data = getNanoResults(TestResponse.withResults.fields.default);
      expect(successCallback).toHaveBeenCalled();
      expect(data).toBeDefined();
      expect(data.length).toBeDefined();
      expect(data.length).not.toBeGreaterThan(10);
    });
  });

  describe("Format", function () {
    describe("When: valid JSON", function() {
      describe("should call callback function", function () {
        describe("when: data is valid (has property query.results.results) ", function () {
          it("When: there is no items, should pass empty array", function () {
            var data = getNanoResults(TestResponse.noResult);
            expect(successCallback).toHaveBeenCalled();
            expect(data.length).toBe(0);
          });
          it("When: there is one item, should pass object in an array", function () {
            var data = getNanoResults(TestResponse.withResults.oneResult);
            expect(successCallback).toHaveBeenCalled();
            expect(data.length).toBe(1);
          });
          it("When: there are more than one items, should pass them in array", function () {
            var data = getNanoResults(TestResponse.withResults.fields.default);
            expect(successCallback).toHaveBeenCalled();
            expect(data.length).toBe(2);
          });
        });
      });

      describe("should not call callback function", function () {
        it("when: data is invalid (syntax error in query sent to API)", function () {
          getNanoResults(TestResponse.errorJson);
          expect(successCallback).not.toHaveBeenCalled();
        });
      });
    });

    describe("when: invalid JSON", function(){
      it("should not throw exceptions", function(){
        expect(getNanoResults.bind(this, TestResponse.empty)).not.toThrow();
        expect(getNanoResults.bind(this, TestResponse.html)).not.toThrow();
        expect(getNanoResults.bind(this, TestResponse.xml)).not.toThrow();
        expect(getNanoResults.bind(this, TestResponse.rss)).not.toThrow();
        expect(getNanoResults.bind(this, TestResponse.json)).not.toThrow();
        expect(getNanoResults.bind(this, TestResponse.errorJson)).not.toThrow();
      });

      it("should not call callback function", function(){
        function callFn(testResponse) {
          getNanoResults(testResponse);
          return {successCallback: successCallback};
        }
        expect(callFn(TestResponse.empty).successCallback).not.toHaveBeenCalled();
        expect(callFn(TestResponse.html).successCallback).not.toHaveBeenCalled();
        expect(callFn(TestResponse.xml).successCallback).not.toHaveBeenCalled();
        expect(callFn(TestResponse.rss).successCallback).not.toHaveBeenCalled();
        expect(callFn(TestResponse.json).successCallback).not.toHaveBeenCalled();
        expect(callFn(TestResponse.errorJson).successCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe("Data type of fields", function() {
    var item;
    var options = {
      fields: ['title', 'link', 'date', 'description']
    };

    beforeEach(function(){
      successCallback = jasmine.createSpy('successCallback');
      fakeXMLHTTPRequest.setResponse(TestResponse.withResults.fields.all);
      nanofeed.fetch(urls.valid.string, options, successCallback);
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
      successCallback = jasmine.createSpy('successCallback');
      fakeXMLHTTPRequest.setResponse(response);
      nanofeed.fetch(urls.valid.string, options, successCallback);
      expect(successCallback).toHaveBeenCalled();
      return getCallbackParam(successCallback).first();
    }

    beforeEach(function(){
      item = undefined;
    });

    describe("present in options.fields", function() {
      it("should have 'title'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all, { fields: ['title'] });
        expect(item.title).toBeDefined();
      });
      it("should have 'link'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all, { fields: ['link'] });
        expect(item.link).toBeDefined();
      });
      it("should have 'pubDate'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all, { fields: ['pubDate'] });
        expect(item.pubDate).toBeDefined();
      });
      it("should have 'description'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.all, { fields: ['description'] });
        expect(item.description).toBeDefined();
      });
    });

    describe("not present in options.fields", function() {
      it("should not have 'title'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none, { fields: ['link'] });
        expect(item.title).toBeUndefined();
      });
      it("should not have 'link'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none, { fields: ['date'] });
        expect(item.link).toBeUndefined();
      });
      it("should not have 'pubDate'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none, { fields:['description'] });
        expect(item.pubDate).toBeUndefined();
      });
      it("should not have 'description'", function () {
        item = getFirstNanoResult(TestResponse.withResults.fields.none, { fields: ['title'] });
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
      it("should have 'title' as default, when options.fields has not any valid field enumerated", function () {
        var options = { fields: [] };
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
    fakeXMLHTTPRequest.setResponse(urls.valid.string).setError();
  });

  it("should not throw exceptions", function(){
    expect(function(){
      nanofeed.fetch(urls.valid.string, successCallback);
    }).not.toThrow();
  });

  it("should not call callback function", function(){
    nanofeed.fetch(urls.valid.string, successCallback);
    expect(successCallback).not.toHaveBeenCalled();
  });
});
