# nanofeed

[![GitHub version](https://badge.fury.io/gh/andretf%2Fnanofeed.svg)](https://badge.fury.io/gh/andretf%2Fnanofeed)
[![Code Climate](https://codeclimate.com/github/andretf/nanofeed/badges/gpa.svg)](https://codeclimate.com/github/andretf/nanofeed)
[![Build Status](https://travis-ci.org/andretf/nanofeed.svg?branch=master)](https://travis-ci.org/andretf/nanofeed)
[![Test Coverage](https://codeclimate.com/github/andretf/nanofeed/badges/coverage.svg)](https://codeclimate.com/github/andretf/nanofeed/coverage)

Tiny feed parser built in JavaScript.

No dependencies.<br>
Asynchronous requests.<br>
Multiple feeds sources.<br>
Multiple independent successive calls.

**[bower](bower.io)**

    bower install nanofeed

##Examples

    // minimal
    nanofeed.fetch(url, function(items) {
      console.log(items);
    });

    // with options
    nanofeed.fetch(url, {fields: ['title','date'], qty: 15}, function(items){
      items.forEach(function(x){
        var newItemHtml = '<li>' + items.title + ' - ' + item.date + '</li>';
        document.getElementById('feed').innerHTML += newItemHtml;
      });
    });

    // Multiple feed sources
    nanofeed.fetch([socialFeedUrl, newsFeedUrl], addFeedItems)

    // Successive calls
    nanofeed.fetch([socialFeedUrl, newsFeedUrl], addFeedItems)
            .fetch(weatherFeedUrl, addWeatherFeedItems);


##Documentation

###`nanofeed.fetch(feed_url, [options], success_callback);`

####feed_url<br>
absolute URLs of RSS feeds<br>
**required**<br>
**`string`** | **`string array`**

####options<br>
options for querying feed<br>
**optional**<br>
**`object`**<br>

- **fields**<br>
fields to be returned from feed source(s)<br>
optional<br>
`string array`<br>
default: `['title', 'link']`<br>
accepted values: `title`, `link`, `date`, `description`

- **qty**<br>
quantity of feed entries to return<br>
optional<br>
`integer`<br>
default: `5`<br>
accepted values: `> 0`, maximum limited by feed source

####success_callback<br>
callback function called on success<br>
**required**<br>
**`function`**

\* Field `title` is the the default when `options.fields` has no valid fields.<br>
\* Results are always ordered by most recent publish date.<br>
\* IE10+ support

##Authoring
- Andre Figueiredo <andretf@gmail.com>
