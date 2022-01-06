const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//for database 
const mongoose = require("mongoose");
//coonection method
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

//schema
const postSchema = {
    title: {
        type: String,
        required: [true]
    },
    content: String
}
//model
const Post = mongoose.model("Post", postSchema);




const homeContent = "Welcome to my diary.this diary contains all about my reading materials";
const aboutContent = "My name is Gaurav and i have completed my B.tech in 2020";
const contactContent = "This is contact us page";



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function (req, res) {

    //post fetched from databse 
    Post.find({}, function (err, posts) {
        res.render("home", {
            startingContent: homeContent,
            posts: posts
        });
    });
    
})


app.get("/about", function (req, res) {
    res.render("about", { aboutPage: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactPage: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});


app.post("/compose", function (req, res) {
    
    //new post 
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postDescription
    });
    // posts.push(post);
    post.save(function(err){

        if (!err){
     
          res.redirect("/");
     
        }
     
      });
    

});


app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId},function(err,post){
        res.render("post", {postTitle: post.title,content: post.content})
    })
});




app.listen(3000, function (req, res) {
    console.log("Server is running on port 3000");
})