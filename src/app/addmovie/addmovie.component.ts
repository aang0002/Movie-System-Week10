import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-addactor",
  templateUrl: "./addmovie.component.html",
  styleUrls: ["./addmovie.component.css"],
})
export class AddmovieComponent {
  movieTitle: string = "";
  movieYear: number = 0;
  movieId: string = "";
  constructor(private dbService: DatabaseService, private router: Router) {}

   //Create a new Moview, POST request
   onSaveMovies() {
    let obj = { title: this.movieTitle, year: this.movieYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.router.navigate(["/listmovies"]);
    });
  }
}