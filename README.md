[![GitHub version](https://badge.fury.io/gh/andretf%2Fnanofeed.svg)](https://badge.fury.io/gh/andretf%2Fnanofeed)
[![Code Climate](https://codeclimate.com/github/andretf/nanofeed/badges/gpa.svg)](https://codeclimate.com/github/andretf/nanofeed)
[![Build Status](https://travis-ci.org/andretf/nanofeed.svg?branch=master)](https://travis-ci.org/andretf/nanofeed)
[![Test Coverage](https://codeclimate.com/github/andretf/nanofeed/badges/coverage.svg)](https://codeclimate.com/github/andretf/nanofeed/coverage)
# nanofeed
#### Tiny RSS feed parser built in JavaScript.

No library dependencies.<br>
Asynchronous requests.<br>
Multiple feeds sources.<br>
Multiple independent successive calls.<br>
Uses Yahoo! API

## Installation

    bower install nanofeed
    npm install nanofeed

## Examples
```javascript
// minimal
nanofeed.fetch(url, function(items) {
  console.log(items);
});

// Multiple feed sources
nanofeed.fetch([socialFeedUrl, newsFeedUrl], addFeedItems)

// Successive calls
nanofeed.fetch([socialFeedUrl, newsFeedUrl], addFeedItems)
        .fetch(weatherFeedUrl, addWeatherFeedItems);

// Callback function receive array of items retrieved from the feed
function callback(items){
  items.forEach(function(x){
    var newItemHtml = '<li>' + items.title + ' - ' + item.date + '</li>';
    document.getElementById('feed').innerHTML += newItemHtml;
  });
}

// Setting options for a function call
nanofeed.fetch(url, {
    fields: ['title', 'date'],
    qty: 15
  },
  callback
);

// or globally for all function calls
nanofeed.options = {
    fields: ['title', 'date'],
    qty: 15
};
nanofeed.fetch(url, callback);
nanofeed.fetch(weatherFeedUrl, addWeatherFeedItems);
```

## Documentation
#### `nanofeed.fetch(feed_url, [options,] success_callback);`

- #### feed_url<br>
Absolute URL(s) of the RSS feed(s).<br>
*required*<br>
**`string`** | **`string array`**

- #### options<br>
Options about format of result returned from feed sources.<br>
*optional*<br>
**`object`**<br>

  - **fields**<br>
  Fields to be returned from feed source(s).<br>
  *optional* <br>
  **`string array`**<br>
  default: `['title', 'link']`<br>
  accepted values: `title` | `link` | `date` | `description`.

  - **qty**<br>
  Quantity of feed entries to return.<br>
  *optional*<br>
  **`integer`**<br>
  default: `5`<br>
  accepted values: `>0` *<br>
  <sup>*</sup><sup>(maximum limited by feed source or Feed API)</sup>

- #### success_callback<br>
Callback function called on success.<br>
*required*<br>
**`function(data)`**

  - **data**<br>
  List of feed entries ordered by most recent publish date.<br>
  **`array of object:`**<br>
    - title: `string`
    - link: `string`
    - pubDate: `date`
    - description: `string`

For further documentation see specifications.

## Specification & Tests

The specification of this library is written in BDD ubiquitous language.
It is used to run tests with [Jasmine](https://github.com/jasmine/jasmine) JavaScript test framework.

Here is the location of the specification and results of its test on library:
- project source code at:
    - [nanofeed/spec/specs.js](https://github.com/andretf/nanofeed/blob/master/spec/specs.js)
    - [nanofeed/spec/specRunner.html](https://github.com/andretf/nanofeed/blob/master/spec/specRunner.html)
- online at:
    - https://andretf.github.io/nanofeed/spec
    - https://andretf.github.io/nanofeed/spec/specs.js

To see the coverage of these tests see https://andretf.github.io/nanofeed/spec/coverage. They are runned with [karma](https://github.com/karma-runner/karma) + [karma-coverage](https://github.com/karma-runner/karma-coverage).

## Support

Desktop | Mobile
--------|---------
Chrome  | Chrome for Android
Firefox | Firefox Mobile
IE10+ support | IE Mobile
Safari  | Safari Mobile
Opera   | Android

##Authoring
- Andre Figueiredo <andretf.inf@gmail.com>
