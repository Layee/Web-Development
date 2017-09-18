var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/blog_demo");


// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/*
var NewUser = new User({
        email:"abrahamswaray72@gmailc.om",
        name: "Abe Layee"
});
NewUser.posts.push({
    title: "I am starting to understand this",
    content: " Never give up and keep trying till you get it right"
});

NewUser.save(function(err,user){
        if(err){
            console.log(err);
        }   else {
                console.log(user);
        }
});
    */
User.findOne({name:"Abe Layee"}, function(err,findUser){
     if(err){
         console.log(err);
     }   else {
          findUser.posts.push({
              title: "Mongoose is the boss of  database",
              content: "I agree with Abe. Mongoose is the king of databases."
          });
            findUser.save(function (err, user) {
                    if(err){
                        console.log(err);
                    }    else {
                         console.log(user);
                    }
            });
     }
});