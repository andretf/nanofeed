var NanoFeed = (NanoFeed || function(url, options, callback) {
  'use strict';

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = extend({
    title: true,
    link: true,
    date: false,
    description: false,
    qty: 5
  }, options);

  var config = {
    query: 'SELECT ' + getQueryColumns(options) +
    ' FROM rss' +
    ' WHERE url="' + url + '"' +
    ' LIMIT ' + options.qty
  };

  url = '//query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(config.query) + '&format=json&callback=';

  getJSON(url, function (json) {
    if (json && json.query) {
      var data = [];

      if (json.query.results && json.query.results.item) {
        var result = json.query.results.item;

        if (result) {
          data = result.length ? result : [result];
        }
      }

      return callback(data);
    }
  });

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function getQueryColumns(options) {
    var cols = [];

    if (options.title) cols.push('title');
    if (options.link) cols.push('link');
    if (options.date) cols.push('pubDate');
    if (options.description) cols.push('description');

    return cols.join(',') || 'title';
  }

  function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      var data;
      try {
        data = JSON.parse(request.responseText);
      }
      catch(e) { }
      callback(data);
    };

    request.send();
  }

  return NanoFeed;
});
