const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find({})
            .populate('movies')
            .exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
            });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                })
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                })
            })
        });
    },

    // Delete an actor and all its movies
    deleteActorAndMovies: function(req, res){
        Actor.deleteOne({_id: req.params.id}, function(err, actorStatus){
            if (err) return res.status(400).json(err);
            if (!actorStatus) return res.status(404).json();
            Movie.deleteMany({ actors: { $in: req.params.id } }, function(err, movieStatus){
                if (err) return res.status(400).json(err);
                if (!movieStatus) return res.status(404).json();
                res.json({"deleteMpvies" : movieStatus,
                            "deletedActors": actorStatus});
            })
        })
    },

    //Remove a movie from the list of movies of an actor
    // http://localhost:8080/actors/1234/987
    deleteMovieFromActor: function(req, res){
        Actor.findOneAndUpdate({_id: req.params.actorid}, { $pull: {movies: req.params.movieid} }, function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
            console.log("Deleted movie from actor successfully");
        })
    },

    emptyMovie: function(req, res){
        Actor.findOne({_id: req.params.id}, function(err, actor){
            if (err) return res.status(400).json("lol");
            if (!actor) return res.status(404).json();
            actor.movies = [];
            actor.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(actor);
            })
        })
    },
};