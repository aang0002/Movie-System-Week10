const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const morgan = require('morgan');
const app = express();
let path = require('path');

app.listen(8080);

// middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/Movie-System")));
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.delete('/actors/:id/emptymovies', actors.emptyMovie);
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/movies', actors.deleteActorAndMovies);
app.delete('/actors/:actorid/:movieid', actors.deleteMovieFromActor);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/movies/:id', movies.getOne);
app.get('/movies/:year1/:year2', movies.getAllYearsBetween);
app.post('/movies', movies.createOne);
app.post('/movies/:movieid/actors', movies.addActor);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieid/:actorid', movies.deleteActorFromMovie);
app.delete('/movies/deleteyearsbetween/:year1/:year2', movies.deleteYearsBetween);