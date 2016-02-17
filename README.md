# nano-feed
Tiny feed parser built in JavaScript.

No dependencies.

Simply call:

    NanoFeed(url, function(items) {
        console.log(items);
    })


    NanoFeed(url, {qty: 10}, function(items){
        items.forEach(function(x){
            document.getElementById('feed').apped
        });
    })


##Documentation

    NanoFeed(url, {
        title: true,
        link: true,
        date: false,
        description: false,
        qty: 5
    }, success_callback);

Feed field `title` is the default if all fields are set to `false`.

##Authoring
- Andre Figueiredo <andretf@gmail.com>
