import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { RoundComponent } from './pages/round/round.component';
import { Top8Component } from './pages/top8/top8.component';
import { RankingComponent } from './pages/ranking/ranking.component';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ErreurRoutageComponent } from './pages/erreur-routage/erreur-routage.component';
import { HeaderComponent } from './pages/header/header.component';
import { RondeComponent } from './pages/ronde/ronde.component';
import { ScoreComponent } from './pages/score/score.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    RoundComponent,
    Top8Component,
    RankingComponent,
    AcceuilComponent,
    MenuComponent,
    ErreurRoutageComponent,
    HeaderComponent,
    RondeComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
