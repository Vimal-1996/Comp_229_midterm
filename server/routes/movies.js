// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  
  movies.find( (err, list) => {   
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
      //res.send("getting data")
    }
  });
  

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('movies/details',{title:"Add a movie",list:[]})
});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {
  console.log(req.body)
    /*****************
     * ADD CODE HERE *
     *****************/
    const newMovie = new movies({
      Title: req.body.Title,
      Description: req.body.Description,
      Released: req.body.Released,
      Director: req.body.Director,
      Genre: req.body.Genre
    })
    console.log(newMovie);

    
    newMovie.save((err,results)=>{
      if(err){
        console.log(err)
      }else{
        console.log(results+"created")
        res.redirect('/movies')
      }
    })
    
});

// // GET the Movies Details page in order to edit an existing Movies
// /*
 router.get('/edit/:id', async(req, res, next) => {
     const id = req.params.id
     console.log(id)
     movies.findById(id,(err,result)=>{
       if(err){
         console.log(err)
       }else{
         console.log(res)
         res.render('movies/details',{title:"Edit Movie",list:result})
       }
     })
 });

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  const newMovie= {
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Released": Number(req.body.Released),
    "Director": req.body.Director,
    "Genre": req.body.Genre
  }
  movies.updateOne({_id:req.params.id},newMovie,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/movies')
    }
  })
    
    
    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id
  movies.deleteOne({_id:req.params.id})
  .then(()=>{
    res.redirect('/movies')
  })
  .catch((err)=>{
    console.log("error caught",err)
  })
    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
