/* exported nanofeed */
// eslint-disable-next-line no-unused-vars
var nanofeed = (function () {
  'use strict';

  var defaultOptions = {
    fields: ['title', 'link'],
    qty: 5
  };

  // We don't want extra columns carrying unnecessary data through the network
  function getQueryColumns(fields) {
    if (Array.isArray(fields)) {
      fields = fields.filter(function (field) {
        return ['title', 'link', 'date', 'description'].indexOf(field) > -1;
      });

      if (!fields.length) {
        fields = defaultOptions.fields;
      }
    }
    else {
      fields = defaultOptions.fields;
    }

    return fields
      .map(function (field) {
        if (field === 'date') {
          return 'item.pubDate';
        }

        return 'item.' + field;
      })
      .join(',');
  }

  function getJSON(url, callback) {
    // eslint-disable-next-line no-undef
    var request = new XMLHttpRequest();
    request.onload = function () {
      var data;
      try {
        data = JSON.parse(request.responseText);
      }
      catch (e) {
        return;
      }
      return callback(data);
    };
    request.open('GET', url, true);
    request.send();
  }

  return {
    options: defaultOptions,
    fetch: function (urls, options, callback) {
      if (typeof urls === 'string') {
        urls = [urls];
      }
      else if (!Array.isArray(urls) || !urls.length) {
        return this;
      }

      if (typeof options === 'function') {
        callback = options;
        options = defaultOptions;
      }

      options.qty = isNaN(options.qty) ? defaultOptions.qty : parseInt(options.qty);

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
              // ignore error
            }
          }
          return callback(data);
        }
      });

      return this;
    }
  };
}());
