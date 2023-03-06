import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

imports: [
  BrowserModule,
  //AppRoutingModule,
  FormsModule
]

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

public joueursInscrits : string[] = []
public nomJoueur: string = ""

  constructor() { }

  ngOnInit(): void {
    this.joueursInscrits = []
    this.nomJoueur = ""
  }

  public onSubmitAjout(){
    if (this.nomJoueur != "") {
      this.joueursInscrits.push(this.nomJoueur);
      this.nomJoueur = ""      
    }
  }

  public retireJoueur(joueur: string){
    console.log(joueur);
    var index = this.joueursInscrits.findIndex(j => j==joueur);
    if (index === -1) {
      alert("erreur de suppression, le joueur n'existe pas")
    } else {
      this.joueursInscrits.splice(index,1)
    }
  }

  public lancerTournoi(){
    //création du tournoi en base
    //retour de l'id du tournoi en base pour transmission
  }

}
