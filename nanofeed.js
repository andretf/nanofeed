var nanofeed = (function () {
  'use strict';

  if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var i = 1, len = arguments.length; i < len; i++) {
        var source = arguments[i];
        if (source !== undefined && source !== null) {
          for (var key in source) {
            if (source.hasOwnProperty(key)) {
              output[key] = source[key];
            }
          }
        }
      }
      return output;
    };
  }

  // We don't want extra columns carrying unnecessary data through the network
  function getQueryColumns(fields) {
    var cols = '';

    if (fields.indexOf) {
      cols += fields.indexOf('title') > -1 ? 'item.title,' : '';
      cols += fields.indexOf('link') > -1 ? 'item.link,' : '';
      cols += fields.indexOf('date') > -1 ? 'item.pubDate,' : '';
      cols += fields.indexOf('description') > -1 ? 'item.description,' : '';
    }

    return cols.slice(0, -1) || 'item.title';
  }

  function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.onload = function () {
      var data;
      try {
        data = JSON.parse(request.responseText);
      }
      catch (e) {
      }
      callback(data);
    };
    request.open('GET', url, true);
    request.send();
  }

  return {
    fetch: function (urls, options, callback) {
      if (typeof urls === 'string') {
        urls = [urls];
      }
      else if (!Array.isArray(urls) || !urls.length) {
        return this;
      }

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      options = Object.assign({}, {
        fields: ['title', 'link'],
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
        .replace('{COLS}', getQueryColumns(options.fields))
        .replace('{URLS}', urls.join('","'))
        .replace('{QTY}', options.qty);

      var url = config.baseUrl + '&q=' + encodeURIComponent(query);

      getJSON(url, function (json) {
        if (json && json.query && json.query.count >= 0) {
          var data = [];
          if (json.query.count) {
            try {
              var result = json.query.results.results.item;
              data = result.length ? result : [result];

              if (options.fields.indexOf('date') > -1) {
                data.forEach(function (item) {
                  item.pubDate = new Date(item.pubDate);
                });
              }
            }
            catch (e) {
            }
          }
          return callback(data);
        }
      });

      return this;
    }
  }
})();
