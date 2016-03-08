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

###Examples

    // minimal
    NanoFeed(url, function(items) {
        console.log(items);
    });

    // with options
    NanoFeed(url, {date: true, qty: 15}, function(items){
        items.forEach(function(x){
            var newItemHtml = '<li>' + items.title + ' - ' + item.date + '</li>';
            document.getElementById('feed').innerHTML += newItemHtml;
        });
    });

    // Multiple feed sources
    NanoFeed([socialFeedUrl, newsFeedUrl], addFeedItems)

    // Successive calls
    NanoFeed([socialFeedUrl, newsFeedUrl], addFeedItems)
            (weatherFeedUrl, addWeatherFeedItems);


###Documentation

    NanoFeed(feed_url, <optional> {
        title: true,
        link: true,
        date: false,
        description: false,
        qty: 5
    }, success_callback);
    
    function success_callback(itemsArray){
    }

\* Feed field `title` is the default if all fields are set to `false`.<br>
\* Results are always ordered by most recent publish date.<br>
\* IE10+ support

###Authoring
- Andre Figueiredo <andretf@gmail.com>
