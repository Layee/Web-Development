var mongoose = require('mongoose'),
    campground = require('./models/campground'),
    Comment = require('./models/comment'),
    data = [
        {
            name: "Cloud's Rest",
            image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description: " Beautiful place to spend time with yours loved ones!"
        },

        {
            name: "Cloud's Rest",
            image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description: " Beautiful place to spend time with yours loved ones!"
        },

        {
            name: "Cloud's Rest",
            image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description: " Beautiful place to spend time with yours loved ones!"
        }
    ];


function seedDB() {
    // delete all data from the database
    campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed Campground!");
        data.forEach(function (seed) {
            // add few campground to the database
            campground.create(seed, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(" Added a Campground!");
                    // create comment
                    Comment.create({
                        text: "This is place is awesome, but I wish there was internet!",
                        author: "Abraham Swaray"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            data.comments.push(comment);
                            data.save();
                            console.log("Created New Comment!");
                        }

                    });
                }
            });
        });
    });
    // add few campgrounds

}
module.exports = seedDB;
