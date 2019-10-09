[![GitHub version](https://badge.fury.io/gh/andretf%2Fnanofeed.svg)](https://badge.fury.io/gh/andretf%2Fnanofeed)
[![Code Climate](https://codeclimate.com/github/andretf/nanofeed/badges/gpa.svg)](https://codeclimate.com/github/andretf/nanofeed)
[![Build Status](https://travis-ci.org/andretf/nanofeed.svg?branch=master)](https://travis-ci.org/andretf/nanofeed)
[![Test Coverage](https://codeclimate.com/github/andretf/nanofeed/badges/coverage.svg)](https://codeclimate.com/github/andretf/nanofeed/coverage)

# nanofeed

#### Tiny RSS feed parser client built in JavaScript.

No library dependencies.<br>
Asynchronous requests.<br>
Multiple feeds sources.<br>
Multiple independent successive calls.<br>
Uses [Yahoo! YQL Plataform](https://developer.yahoo.com/yql).<br>
Widely supported by browsers.

## WARNING

nanofeed is a frontend library who relies on Yahoo Query API to fetch RSS content. It's currently not working since Yahoo shutted down the service. Need some reworking for use other services and allowing user to change it.

## Installation

Recommended using CDN:

```HTML
<script src="https://www.jsdelivr.com/package/npm/nanofeed@1/dist/nanofeed.min.js"></script>
```

or package manager:

    $ yarn add nanofeed
    $ pnpm i -D nanofeed

## Examples

```javascript
// minimal
nanofeed.fetch(url, function(items) {
  console.log(items)
})

// Multiple feed sources
nanofeed.fetch([socialFeedUrl, newsFeedUrl], addFeedItems)

// Successive calls
nanofeed
  .fetch([socialFeedUrl, newsFeedUrl], addFeedItems)
  .fetch(weatherFeedUrl, addWeatherFeedItems)

// Callback function receive array of items retrieved from the feed
function callback(items) {
  items.forEach(function(x) {
    var newItemHtml = '<li>' + items.title + ' - ' + item.date + '</li>'
    document.getElementById('feed').innerHTML += newItemHtml
  })
}

// Setting options for a function call
nanofeed.fetch(
  url,
  {
    fields: ['title', 'date'],
    qty: 15
  },
  callback
)

// or globally for all function calls
nanofeed.options = {
  fields: ['title', 'date'],
  qty: 15
}
nanofeed.fetch(url, callback)
nanofeed.fetch(weatherFeedUrl, addWeatherFeedItems)
```

## Documentation

#### `nanofeed.fetch(feed_url, [options,] success_callback)`

| parameter        | type                   | required | description                                                |
| ---------------- | ---------------------- | -------- | ---------------------------------------------------------- |
| feed_url         | string \| string array | yes      | Absolute URL(s) of the RSS feed(s).                        |
| options          | object                 | no       | Options about format of result returned from feed sources. |
| success_callback | function(data)         | yes      | Callback function called on success.                       |

#### Options parameters

| attribute | type         | default           | accepts                                                          | description                                |
| --------- | ------------ | ----------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| fields    | string array | ['title', 'link'] | title, link, date, description                                   | Fields to be returned from feed source(s). |
| qty       | integer      | 5                 | positive integers <br>(limited by feed source or Yahoo Feed API) | Quantity of feed entries to return.        |

#### Callback function called on success:<br>

Returns as parameter the list of feed entries ordered by most recent publish date.
Array of object:

| attribute   | type   |
| ----------- | ------ |
| title       | string |
| link        | string |
| pubDate     | date   |
| description | string |

For further documentation see specifications.

## Specification & Tests

- in project:
  - [spec/specs.js](https://github.com/andretf/nanofeed/blob/master/spec/specs.js) (source code)
  - [spec/specRunner.html](https://github.com/andretf/nanofeed/blob/master/spec/specRunner.html) (HTML UI)
- online:
  - https://andretf.github.io/nanofeed/spec
  - https://andretf.github.io/nanofeed/spec/specs.js

Detailed code coverage is available at https://andretf.github.io/nanofeed/spec/coverage.

## Authoring

- Andre Figueiredo \<andretf.inf@gmail.com\>
