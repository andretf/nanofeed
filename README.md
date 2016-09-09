[![GitHub version](https://badge.fury.io/gh/andretf%2Fnanofeed.svg)](https://badge.fury.io/gh/andretf%2Fnanofeed)
[![Code Climate](https://codeclimate.com/github/andretf/nanofeed/badges/gpa.svg)](https://codeclimate.com/github/andretf/nanofeed)
[![Build Status](https://travis-ci.org/andretf/nanofeed.svg?branch=master)](https://travis-ci.org/andretf/nanofeed)
[![Test Coverage](https://codeclimate.com/github/andretf/nanofeed/badges/coverage.svg)](https://codeclimate.com/github/andretf/nanofeed/coverage)

# nanofeed
#### Tiny RSS feed parser built in JavaScript.

No dependencies.<br>
Asynchronous requests.<br>
Multiple feeds sources.<br>
Multiple independent successive calls.

##Installation

    bower install nanofeed
[![Bower version](https://badge.fury.io/bo/nanofeed.svg)](https://badge.fury.io/bo/nanofeed)

    npm install nanofeed
[![npm version](https://badge.fury.io/js/nanofeed.svg)](https://badge.fury.io/js/nanofeed)
  
##Examples
```
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

##Documentation
####`nanofeed.fetch(feed_url, [options,] success_callback);`

- **feed_url**: absolute URL(s) of the RSS feed(s).<br>
  <*required*> **`string`** | **`string array`**

- **options**: options about format of result returned from feed sources.<br>
  <*optional*> **`object`**<br>

  - ****fields****:  fields to be returned from feed source(s).<br>
    <*optional*> **`string array`**<br>
    accepted values: `title` | `link` | `date` | `description`.
    default: `['title', 'link']`<br>

  - ****qty****: quantity of feed entries to return.<br>
    <*optional*> **`integer`**<br>
    accepted values: `>0` *<br>
    default: `5`<br>
    <sup>*</sup><sup>(maximum limited by feed source or Feed API)</sup>

- **success_callback**: callback function called on success.<br>
  <*required*> **`function(data)`**

  - **data**: list of feed entries ordered by most recent publish date.<br>
    **`array of object:`**<br>
      - title: `string`
      - link: `string`
      - pubDate: `date`
      - description: `string`

For further documentation see specifications at [nanofeed/spec/specs.js](https://github.com/andretf/nanofeed/blob/master/spec/specs.js).

##Support

Desktop | Mobile
--------|---------
Chrome  | Chrome for Android
Firefox | Firefox Mobile
IE10+ support | IE Mobile
Safari  | Safari Mobile
Opera   | Android

##Authoring
- Andre Figueiredo <andretf.inf@gmail.com>
