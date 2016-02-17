var NanoFeed = function(url, options, callback) {
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

  var url = '//query.yahooapis.com/v1/public/yql?q=' + decodeURIComponent(config.query) + '&format=json&callback=';

  getJSON(url, function (json) {
    var data = [];

    if (json.query && json.query.results && json.query.results.item) {
      if (!json.query.results.item.length) {
        data.push(json.query.results.item);
      }
      else {
        data = json.query.results.item;
      }
    }

    return callback(data);
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
    function onerror(){
     throw 'An error occurred while trying to retrieve the feed.';
    }

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data;
        try {
          data = JSON.parse(request.responseText);
        }
        catch (ex) {
          onerror();
        }

        callback(data);
      }
      else {
        onerror()
      }
    };

    request.onerror = onerror;

    request.send();
  }

};
