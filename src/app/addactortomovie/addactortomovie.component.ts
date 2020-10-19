import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  constructor(private router : Router, private dbService : DatabaseService) { }
  actorsDB : any[] = [];
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB : any[] = [];
  movieTitle: string = "";
  movieYear: number = 0;
  movieId: string = "";

  //Get all Movies
  onGetMovies() {
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Get all Actors
  onGetActors() {
    console.log("From on GetActors");
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Add Actor to Movie
  addActorToMovie(){
    let data = {id: this.actorId};
    this.dbService.addActorToMovie(this.movieId, data).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Update local variables of movie
  onSelectMovieUpdate(item){
    this.movieTitle =  item.title;
    this.movieYear = item.year;
    this.movieId = item._id;
  }

  // Update local variables of actor
  onSelectActorUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

}
