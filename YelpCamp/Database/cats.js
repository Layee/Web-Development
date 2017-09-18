var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/cat_app");
    var catSchema = new mongoose.Schema({
        name:String,
        age: Number,
        temperament: String
    });
var Cat = mongoose.model("Cat",catSchema); // allows me to make new cat
// add new cats to the database
/*
var george = new Cat({
        name:"Mr.Norris",
        age: 14,
        temperament:"Evil"
});

    george.save(function (err, cat) {
        if (err){
            console.log("Something went wrong!");
        }   else {
            console.log("We just save a cat to the database");
            console.log(cat);
        }
    }); // add it to the database

 */
// create method
Cat.create({
    name: "Snowflake",
    age: 2,
    temperament:"Lovely"
},function(err,cat){
    if (err){
        console.log(err);
    }   else {
         console.log(cat);
    }
});
//retrieve all cats from the database
Cat.find({},function(err,cats){
        if(err){
            console.log("Error ...");
            console.log(err);
        }   else{
                console.log("All the Cats in the database ...");
                console.log(cats);
        }
});