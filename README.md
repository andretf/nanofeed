# nano-feed
Tiny feed parser built in JavaScript.

No dependencies.<br>
Asynchronous requests.<br>
Multiple feeds sources.<br>
Multiple indenpendent successive calls.

**Examples:**

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
        title: true
        link: true
        date: false
        description: false
        qty: 5
    }, success_callback);

\* Feed field `title` is the default if all fields are set to `false`.<br>
\* Results are always ordered by most recent publish date.<br>
\* IE10+ support

###Authoring
- Andre Figueiredo <andretf@gmail.com>
