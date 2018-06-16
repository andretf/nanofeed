/*!
 * nanofeed 1.1.3
 * (c) 2016-2018 Andre Figueiredo https://github.com/andretf
 * License: MIT
*/
;
(function (window) {
  'use strict'
  if (!window || !window.document) {
    throw new Error('nanofeed requires a window with a document')
  }

  var defaultOptions = {
    fields: ['title', 'link'],
    qty: 5
  }

  var nanofeed = {
    options: defaultOptions,
    fetch: fetch
  }

  window.nanofeed = window.nanofeed || nanofeed

  function objToQuerystring(obj) {
    return encodeURIComponent(
      Object.keys(obj)
      .map(function (key) {
        return key + '=' + obj[key]
      })
      .join('&')
    )
  }

  // We don't want extra columns carrying unnecessary data through the network
  function queryColumnNames(fields) {
    if (Array.isArray(fields) && fields.length) {
      fields = ['title', 'link', 'date', 'description'].filter(function (field) {
        return fields.indexOf(String(field).toLowerCase()) > -1
      })
    } else {
      fields = defaultOptions.fields
    }

    return fields
      .map(function (field) {
        if (field === 'date') {
          field = 'pubDate'
        }

        return 'item.' + field
      })
      .join(',')
  }

  function getJSON(url, callback) {
    var request = new XMLHttpRequest()
    request.onload = function () {
      var data
      try {
        data = JSON.parse(request.responseText)
      } catch (e) {
        return
      }
      return callback(data)
    }
    request.open('GET', url, true)
    request.send()
  }

  function onData(callback) {
    return function (json) {
      if (!json || !json.query || json.query.count === undefined) {
        return
      }

      try {
        var result = json.query.results.results.item
        result = Array.isArray(result) ? result : [result]
        var data = formatData(result)
        return callback(data)
      } catch (e) {
        return callback([])
      }
    }
  }

  function fetch(urls, options, callback) {
    if (typeof urls === 'string') {
      urls = [urls]
    } else if (!Array.isArray(urls) || !urls.length) {
      return this
    }

    if (typeof options === 'function') {
      callback = options
      options = defaultOptions
    } else {
      options.qty = isNaN(options.qty) ?
        defaultOptions.qty :
        parseInt(options.qty)
    }

    var query = apiQuery(urls, options)
    var url = apiUrl(query)

    getJSON(url, onData(callback))

    return this
  }

  function apiQuery(urls, options) {
    return (
      "SELECT {COLS} FROM yql.query.multi WHERE queries='" +
      'SELECT {COLS} FROM rss WHERE url in ("{URLS}")' +
      '|UNIQUE(field="title",hideRepeatCount="true")' +
      '|UNIQUE(field="link",hideRepeatCount="true")' +
      '|SORT(field="pubDate",descending="true")' +
      "|TRUNCATE({QTY})'"
      .replace('{URLS}', urls.join('","'))
      .replace('{COLS}', queryColumnNames(options.fields))
      .replace('{QTY}', options.qty)
    )
  }

  function apiUrl(query) {
    // Optimized cross-product make simple array of results in 'query.results.results.item'
    // All tables Env allows select from 'yql.query.multi'
    var yqlQuerystring = objToQuerystring({
      format: 'json',
      callback: '',
      crossProduct: 'optimized',
      env: 'http://datatables.org/alltables.env',
      q: query
    })

    return 'https://query.yahooapis.com/v1/public/yql?' + yqlQuerystring
  }

  function formatData(data) {
    if (data[0].pubDate) {
      data.forEach(function (item) {
        item.pubDate = new Date(item.pubDate)
      })
    }

    return data
  }
})(window)
