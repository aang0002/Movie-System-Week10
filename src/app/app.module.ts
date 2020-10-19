import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "./updateactor/updateactor.component";
import { RouterModule, Routes } from "@angular/router";
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';
const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "addactortomovie", component: AddactortomovieComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  {path: '404', component: ViewnotfoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  declarations: [   // declare components only
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    AddactortomovieComponent,
    ViewnotfoundComponent,
  ],
  imports: [    // import modules only (no services, no components)
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [  // services only
    DatabaseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}