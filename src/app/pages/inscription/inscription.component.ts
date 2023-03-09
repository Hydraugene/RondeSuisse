import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JoueurI } from 'src/app/modeles/participants-i';
import { ParticipantsService } from 'src/app/services/participants.service';

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

public joueursInscrits : JoueurI[] = []
public nomJoueur: string = ""
public idCompteur: number=0;
public inscriptionFermes: boolean = false;

  constructor(public participantsService: ParticipantsService, public route:Router) { }

  ngOnInit(): void {
    this.joueursInscrits = []
    this.nomJoueur = ""
  }

  public onSubmitAjout(){
    if (this.nomJoueur != "") {
      this.joueursInscrits.push(this.creerJoueurVide(this.nomJoueur, false));
      this.nomJoueur = ""      
    }
  }

  public creerJoueurVide(nom: string, estLeBye: boolean){
    this.idCompteur=this.idCompteur+1;
    return {"id":this.idCompteur, 
    "nom": nom, 
    "rang":0, 
    "nbVictoire":0, 
    "nbDefaite":0, 
    "nbNull":0, 
    "score":0, 
    "adversaires": [], 
    "gameWin": 0,
    "gamePlayed":0,
    "estLeBye":estLeBye}
  }

  public retireJoueur(idJoueur: number){
    console.log(idJoueur);
    var index = this.joueursInscrits.findIndex(j => j.id==idJoueur);
    if (index === -1) {
      alert("erreur de suppression, le joueur n'existe pas")
    } else {
      this.joueursInscrits.splice(index,1)
    }
  }

  public lancerTournoi(){
    this.inscriptionFermes=false;
    if (this.joueursInscrits.length%2!=0) {
      this.joueursInscrits.push(this.creerJoueurVide("Joueur absent", true))
    }
    this.participantsService.lancementTournoi(this.joueursInscrits);
    this.route.navigateByUrl('/ronde')
  }

}
