var urls = {
  invalid: {
    null: {value: null},
    undefined: {value: undefined},
    function: {
      value: function () {
      }
    },
    object: {value: {}},
    number: {value: 0},
    date: {value: new Date()},
    regexp: {value: /./},
    arrayEmpty: {value: []},
    arrayNotString: {value: [{}]},
    stringArray: {value: ['', 'anything']},
    string: {value: 'anything'},
    invalidJSON: {value: 'news.google.com'}
  },
  valid: {
    stringArray: {
      value: [
        'news.google.com/news?output=rss',
        'news.google.com/news?hl=pt-BR&ned=pt-BR_br&output=rss']
    },
    string: {value: 'news.google.com/news?output=rss'}
  }
};

var TIMEOUT = Math.min(3000 || jasmine.DEFAULT_TIMEOUT_INTERVAL - 500);

describe("Urls parameter", function () {
  ['valid', 'invalid'].forEach(function(validProp){
    var urlsCategory = urls[validProp];
    Object.keys(urlsCategory).forEach(function (key) {
      NanoFeed(urlsCategory[key].value, function(){
        urlsCategory[key].success = true;
      });
      urlsCategory[key].success = false;
    });
  });

  it("should fail for any that is not string/string-array", function (done) {
      setTimeout(function () {
        expect(urls.invalid.null.success).toBe(false);
        expect(urls.invalid.undefined.success).toBe(false);
        expect(urls.invalid.function.success).toBe(false);
        expect(urls.invalid.object.success).toBe(false);
        expect(urls.invalid.number.success).toBe(false);
        expect(urls.invalid.regexp.success).toBe(false);
        expect(urls.invalid.arrayEmpty.success).toBe(false);
        expect(urls.invalid.arrayNotString.success).toBe(false);
        done();
      }, TIMEOUT);
    });

  it("should proceed to retrieve feed only if string or string-array", function (done) {
      setTimeout(function () {
        expect(urls.valid.stringArray.success).toBe(true);
        expect(urls.valid.string.success).toBe(true);
        done();
      }, TIMEOUT);
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
  NanoFeed(urls.valid.string.value, options, function (result) {
    data = result;
  });

  describe("Count", function () {
    it("should match items count with quantity option", function (done) {
      setTimeout(function () {
        expect(data.length).toBe(options.qty);
        done();
      }, TIMEOUT);
    });
  });

  describe("Format", function () {
    it("should have column defined with options", function (done) {
      setTimeout(function () {
        console.log(data);
        expect(typeof data[0].title).toBeDefined();
        expect(typeof data[0].link).toBeDefined();
        expect(typeof data[0].pubDate).toBeDefined();
        expect(typeof data[0].description).toBeDefined();
        done();
      }, TIMEOUT);
    });
  });
});

