var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie
            .find({})
            .populate('actors')
            .exec(function (err, movies) {
                    if (err) return res.status(400).json(err);
                    res.json(movies);
                });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        console.log(newMovieDetails)
        newMovieDetails._id = new mongoose.Types.ObjectId();
        let movie = new Movie(newMovieDetails);
        movie.save(function (err) {
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function(req, res){
        Movie.deleteOne({_id: req.params.id}, function(err){
            if (err) throw err;
            res.json();
        })
    },

    // Remove an actor from the list of actors in a movie
    //  http://localhost:8080/movies/567/2234
    deleteActorFromMovie: function(req, res){
        Movie.update({_id: req.params.movieid}, { $pull: {"actors": req.params.actorid} }, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
            console.log("Deleted actor from movie successfully");
        })
    },

    // Add an existing actor to the list of actors in a movie
    addActor: function(req, res){
        Movie.findOne({_id: req.params.movieid}, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.body.id}, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function(err){
                    if (err) return res.status(500).json(err);
                })
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                })
            })
        })
    },

    // Retrieve (GET) all the movies produced between year1 and year2, where year1>year2
    getAllYearsBetween: function(req, res){
        var year1 = req.params.year1;
        var year2 = req.params.year2;
        Movie
            .find({})
            .where('year').lte(year1).gte(year2)
            .exec(function(err, movies){
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).json();
                res.json(movies)
            })
    },

    //Delete all the movies that are produced between two years. 
    // The two years (year1 & year2) must be sent to the backend server through the request’s body in JSON format.
    deleteYearsBetween: function(req, res){
        var year1 = req.params.year1;
        var year2 = req.params.year2;
        Movie
            .deleteMany({})
            .where('year').lte(year1).gte(year2)
            .exec(function(err, movies){
                if (err) return res.status(400).json(err);
                if (!movies) return res.status(404).jsson;
                res.json(movies)
            })
    }
};