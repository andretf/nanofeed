# nano-feed
Tiny feed parser built in JavaScript.

No dependencies.

Asynchronous feed call.

Multiple function calls.

**Examples:**

    // minimal
    NanoFeed(url, function(items) {
        console.log(items);
    });

    // with options
    NanoFeed(url, {date: true, qty: 15}, function(items){
        items.forEach(function(x){
            document.getElementById('feed').innerHTML += '<li>' + items.title + '</li>';
        });
    });

    // Successive calls
    NanoFeed
        (socialFeedUrl, addSocialFeedItems)
        (weatherFeedUrl, addWeatherFeedItems);


###Documentation

    NanoFeed(feed_url, <optional> {
        title: true
        link: true
        date: false
        description: false
        qty: 5
    }, success_callback);

Feed field `title` is the default if all fields are set to `false`.

###Authoring
- Andre Figueiredo <andretf@gmail.com>
