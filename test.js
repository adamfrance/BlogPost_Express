const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
BlogPost.create({
title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
body: 'Hello'
}, (error, blogpost) =>{
console.log(error,blogpost)
})