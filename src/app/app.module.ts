import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MatSidenavModule, MatToolbarModule, MatInputModule, MatCardModule,
         MatButtonModule, MatGridListModule, MatListModule, MatDialogModule } from '@angular/material';
import { PokemonService } from './service/pokemon/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { PokeDataComponent } from './poke-data/poke-data.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokeDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatListModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    PokeDataComponent
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
