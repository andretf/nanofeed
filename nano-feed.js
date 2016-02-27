var NanoFeed = (NanoFeed || function(urls, options, callback) {
  'use strict';

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (typeof urls === 'string') {
    urls = [urls];
  }
  else if (!Array.isArray(urls) || !urls.length) {
    return NanoFeed;
  }

  options = extend({
    title: true,
    link: true,
    date: false,
    description: false,
    qty: 5
  }, options);

  // Optimized cross-product make simple array of results in 'query.results.results.item'
  // All tables Env allows select from 'query.multi'
  var config = {
    baseUrl: '//query.yahooapis.com/v1/public/yql?format=json&callback=&' +
             'crossProduct=optimized&env=http://datatables.org/alltables.env',
    template: 'SELECT {COLS} FROM query.multi WHERE queries=\'' +
    'SELECT title,link,pubDate,description ' +
    'FROM rss ' +
    'WHERE url in ("{URLS}")' +
    '|UNIQUE(field="title",hideRepeatCount="true")' +
    '|UNIQUE(field="link",hideRepeatCount="true")' +
    '|SORT(field="pubDate",descending="true")' +
    '|TRUNCATE({QTY})\''
  };

  var query = config.template
    .replace('{COLS}', getQueryColumns(options))
    .replace('{URLS}', urls.join('","'))
    .replace('{QTY}', options.qty);

  var url = config.baseUrl + '&q=' + encodeURIComponent(query);

  getJSON(url, function (json) {
    if (json && json.query && json.query.count) {
      try {
        var result = json.query.results.results.item;
        var data = result.length ? result : [result];

        if (options.date) {
          data.forEach(function (item) {
            item.pubDate = new Date(item.pubDate);
          });
        }

        return callback(data);
      }
      catch (e) {
      }
    }
  });

  return NanoFeed;

  //---- private ----------------------------------------------

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function getQueryColumns(options) {
    var cols = '';

    cols += options.title ? 'item.title,': '';
    cols += options.link ? 'item.link,': '';
    cols += options.date ? 'item.pubDate,': '';
    cols += options.description ? 'item.description,': '';

    return cols.slice(0, -1) || 'item.title';
  }

  function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.onload = function () {
      callback(JSON.parse(request.responseText));
    };
    request.open('GET', url, true);
    request.send();
  }
});