const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a blog post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (!err) {
      res.render('home', { posts: posts });
    }
  });
});

// Compose route
app.get('/compose', (req, res) => {
  res.render('compose');
});

// Handle post requests to compose route
app.post('/compose', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  newPost.save((err) => {
    if (!err) {
      res.redirect('/');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
