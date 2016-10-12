var flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "a17c6a5fadc32351ab403086ff9dcce1",
        secret: "72798014d0f72e4d",
        user_id: "143989775@N06",
        access_token: '72157673534760490-23dbf88abf3ac111',
        access_token_secret: '9363ae4af815127f'
    };

flickr.authenticate(flickrOptions, function(error, flickr) {
    flickr.photos.search({
        lat: 38.6081376,
        lon:-89.82540069999999,
        accuracy: 11,
        radius:5,
        page: 1,
        per_page: 100
    }, function(err, result) {
        if(err) throw err;
        photo = (JSON.stringify(result.photos.photo));
    });
});



