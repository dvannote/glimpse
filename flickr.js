var flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "a17c6a5fadc32351ab403086ff9dcce1",
        secret: "72798014d0f72e4dflickrapi"
    };

flickr.authenticate(flickrOptions, function(error, flickr) {
    flickr.photos.search({
        lat: '38.6081223',
        lon: '-89.82539759999997',
        accuracy: 11,
        user_id: flickr.options.user_id,
        page: 1,
        per_page: 500
    }, function(err, result) {
        if(err) throw err;
        console.log(result);
    });
});

