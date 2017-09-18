var  express = require("express");
var app = express();
var boydParser = require("body-parser");
var port = 3000;

var campgrounds = [
        {name:"Salmon Creek", image: "https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg" },
        {name:"Granite Hill", image: "https://farm4.staticflickr.com/3214/2617791137_b433aecdb6.jpg" },
        {name:"Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3247/2997486559_876fc019c2.jpg"}
      ];

var bodyParser = require('body-parser'); // tell node js  use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine","ejs"); // node js ext
app.get("/",function(req,res){
        res.render("landing");
});

app.get("/campgrounds",function(req,res){
      res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
	// get data from form and add to campground array
	 var name = req.body.name; // get the value from the form with
	var image = req.body.image;
	var newCampground = {name:name, image:image}; // create new campground to store new images
	campgrounds.push(newCampground); // push new images into the array

	// redirect back to campground page
	res.redirect("/campgrounds");
	
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(port, function(){
   console.log("YelpCamp is up and running...");
});
