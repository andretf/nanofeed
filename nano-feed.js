var NanoFeed = (NanoFeed || function(urls, options, callback) {
  'use strict';

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof urls === 'string') {
    urls = [urls];
  }

  if (!urls || !urls.join || !urls.length) {
    return NanoFeed;
  }

  options = extend({
    title: true,
    link: true,
    date: false,
    description: false,
    qty: 5
  }, options);

  var config = {
    getQuery: function () {
      var feedQuery = 'SELECT title,link,pubDate,description FROM rss WHERE url=\'{FeedURL}\';';
      var resultQuery = '' +
        'SELECT ' + getQueryColumns(options) + ' ' +
        'FROM yql.query.multi ' +
        'WHERE queries="{FeedURLS}"' +
        '|UNIQUE("item.title","item.link")' +
        '|SORT(field="item.pubDate",descending="true")' +
        '|TRUNCATE(' + options.qty + ')';

      return resultQuery.replace('{FeedURLS}',
        urls.reduce(function (acc, item) {
          return acc + feedQuery.replace('{FeedURL}', item);
        }, '')
      );
    }
  };

  var url = '//query.yahooapis.com/v1/public/yql?format=json&callback=&q=' + encodeURIComponent(config.getQuery());

  getJSON(url, function (json) {
    if (json && json.query) {
      var data = [];

      if (json.query.results && json.query.results.results) {
        var result = json.query.results.results;

        if (result) {
          if (result.item) {
            data = [result.item]
          }
          else if (result.length && result[0].item) {
            data = result.map(function (element) {
              return element.item;
            });
          }
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

    if (options.title) cols.push('item.title');
    if (options.link) cols.push('item.link');
    if (options.date) cols.push('item.pubDate');
    if (options.description) cols.push('item.description');

    return cols.join(',') || 'item.title';
  }

  function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      var data;
      try {
        data = JSON.parse(request.responseText);
      }
      catch (e) {
      }
      callback(data);
    };

    request.send();
  }

  return NanoFeed;
});