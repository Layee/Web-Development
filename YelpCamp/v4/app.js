var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    boydParser = require("body-parser"),
    campground = require('./models/campground'),
    comment = require('./models/comment'),
    user = require('./models/user'),
    seedDB = require('./seeds');
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
            res.render("campgrounds/index", {campgrounds: camp});
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
    res.render("campgrounds/new");
});
// SHOW -show more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    // find item by provided ID in the database
    campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    req.params.id;
});

/************************************************************
 *  COMMENT ROUTES
 * **********************************************************/
app.get("/campgrounds/:id/comments/new", function (req, res) {
    // find campground by id
    campground.findById(req.params.id, function (err,campground) {
        if(err){
            console.log(err);
        }    else {
            res.render("comments/new",{campground:campground});
        }
    });
});
app.post("/campgrounds/:id/comments", function (req,res) {
    // look up campground using id
    campground.findById(req.params.id, function (err,campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds/");
        } else  {
            comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }    else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
// create new comment
// connect to new comment to campground
//redirect to campground show page
});
app.listen(3000, function () {
    console.log("YelpCamp is up and running...");
});
