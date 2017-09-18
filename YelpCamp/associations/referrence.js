var mongoose = require("mongoose"),
 Post = require ("./models/posts"),
    User = require("./models/user");
    mongoose.connect("mongodb://localhost/reference_demo");




User.create({
 email: "bobby@gmail.com",
 name: "Bobby Smith"
 });

Post.create({
    title: "Data Association Using Reference Method part three",
    content: "I say oh my people oh"
}, function (err,post) {
    User.findOne({email:"bobby@gmail.com"}, function (err, findUser) {
            if(err){
                 console.log(err);
            }  else {
                findUser.posts.push(post);
                findUser.save(function(err,data){
                    if(err){
                        console.log(err);
                    }  else {console.log(data);}
                })
            }
    });

});
User.findOne({email:"bobby@gmail.com"}).populate("posts").exec(function(err,user){
         if(err){
             console.log(err);
         } else {
              console.log(user);
         }
});