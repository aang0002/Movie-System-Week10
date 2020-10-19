import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})

export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  // GET ACTORS
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  // POST ACTORS
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  // PUT ACTORS
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  // DELETE ACTORS
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  // GET MOVIES
  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  // POST MOVIES
  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }

  // DELETE MOVIES
  deleteMovie(id){
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  // DELETE MOVIES BELOW A YEAR
  deleteMovieYearsBetween(year1, year2){
    let url = '/movies/deleteyearsbetween/' + year1.toString() + '/' + year2.toString();
    return this.http.delete(url, httpOptions);
  }

  // ADD ACTOR TO MOVIE
  addActorToMovie(movieId, data){
    let url = '/movies/' + movieId.toString() + '/actors'
    return this.http.post(url, data, httpOptions);
  }
}