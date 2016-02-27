'use strict';

describe("Urls parameter", function () {
  beforeEach(function () {
    urls.init().foreach(function (url) {
      url.success = false;
      NanoFeed.call(getContextWithFakeResponse(TestResponses.withResults),
        url.value, {qty: 2}, function () {
          url.success = true;
        });
    });
  });

  it("should fail for any except string or string-array", function () {
      expect(urls.invalid.null.success).toBe(false);
      expect(urls.invalid.undefined.success).toBe(false);
      expect(urls.invalid.function.success).toBe(false);
      expect(urls.invalid.object.success).toBe(false);
      expect(urls.invalid.number.success).toBe(false);
      expect(urls.invalid.regexp.success).toBe(false);
      expect(urls.invalid.arrayEmpty.success).toBe(false);
      // TODO: expect(urls.invalid.arrayNotString.success).toBe(false);
  });

  it("should proceed to retrieve feed if string or string-array", function () {
      expect(urls.invalid.string.success).toBe(true);
      expect(urls.invalid.stringArray.success).toBe(true);
      expect(urls.valid.stringArray.success).toBe(true);
      expect(urls.valid.string.success).toBe(true);
  });
});

describe("Expected results", function () {
  var data;
  var options = {
    title: true,
    link: true,
    date: true,
    description: true,
    qty: 2
  };

  beforeEach(function () {
    NanoFeed.call(getContextWithFakeResponse(TestResponses.withResults),
      urls.valid.string.value, options, function (result) {
      data = result;
    });
  });

  describe("Count", function () {
    it("should match items count with quantity option", function () {
      expect(data.length).toBe(options.qty);
    });
  });

  describe("Format", function () {
    it("should have required columns as defined in options parameter", function () {
      expect(data[0].title).toBeDefined();
      expect(data[0].link).toBeDefined();
      expect(data[0].pubDate).toBeDefined();
      expect(data[0].description).toBeDefined();
    });

    it("columns should be right data type", function () {
      expect(data[0].title).toEqual(jasmine.any(String));
      expect(data[0].link).toEqual(jasmine.any(String));
      expect(data[0].pubDate).toEqual(jasmine.any(Date));
      expect(data[0].description).toEqual(jasmine.any(String));
    });
  });
});
