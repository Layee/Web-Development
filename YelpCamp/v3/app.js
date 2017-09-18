var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    boydParser = require("body-parser"),
    campground = require('./models/campground'),
    comment = require('./models/comment'),
    user = require('./models/user'),
    seedDB = require('./seeds'),
    port = 3000;
mongoose.connect("mongodb://localhost/yelp_camp");

var bodyParser = require('body-parser'); // tell node js  use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs"); // node js ext
app.get("/", function (req, res) {
    res.render("landing");
});
seedDB(); // run each time the sever starts
// INDEX - show all campgrounds
app.get("/campgrounds", function (req, res) {
    // get all campgrounds from database
    campground.find({}, function (err, camp) {
        if (err) {
            console.log("There was an error retrieving the data from the database...");
            console.log(err);
        } else {
            res.render("index", {campgrounds: camp});
        }
    })

});

// CREATE  - add new campgrounds to database
app.post("/campgrounds", function (req, res) {
    // get data from form and add to campground array
    var name = req.body.name; // get the value from the form with
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}; // create new campground to store new images
    // create new campground and save to database
    campground.create(newCampground, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campground page
            res.redirect("/campgrounds");
        }
    });


});
// NEW - show forms to create new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});
// SHOW -show more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    // find item by provided ID in the database
    campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id;
})


app.listen(port, function () {
    console.log("YelpCamp is up and running...");
});
