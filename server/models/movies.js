let mongoose = require('mongoose');

// create a model class
let MoviesSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Released: Number,
    Director: String,
    Genre: String
},
{
  timestamps:true
});

module.exports = mongoose.model('movies', MoviesSchema);