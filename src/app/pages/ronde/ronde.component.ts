import { Component, OnInit } from '@angular/core';
import { JoueurI, MatchI } from 'src/app/modeles/participants-i';
import { ParticipantsService } from 'src/app/services/participants.service';


@Component({
  selector: 'app-ronde',
  templateUrl: './ronde.component.html',
  styleUrls: ['./ronde.component.css']
})
export class RondeComponent implements OnInit {

  public numeroRonde: number = 0;
  rondeEnCours: boolean = false
  selectionEnCours: number =-1;

  public participants : JoueurI[] = []
  public matchsEnCours : MatchI[] = []

  constructor(public participantsService: ParticipantsService) { }

  ngOnInit(): void {
  }


  public rondeTerminee(){
    // vérification que tous les matchs sont finis
    let estComplet: boolean = true
    this.matchsEnCours.forEach(element => {
      estComplet = estComplet && element.fini
    });
    if (!estComplet) {
      estComplet = confirm("Tous les scores n'ont pas été enregistrés. Continuer quand même ?");
    } 
    if (estComplet) {
      this.rondeEnCours=false
      //TODO calcul des scores et enregistrement des résultats sur les joueurs.
    }

  }

  public commencerRonde(){
    this.numeroRonde++;
    this.rondeEnCours=true
    console.log(this.matchsEnCours)
    this.participantsService.setPairing()
    this.matchsEnCours = this.participantsService.getPairing()
    console.log("ici"+this.matchsEnCours);
    //TODO
  }

  selectionnerScore(match: MatchI){
    this.selectionEnCours=match.id
  }

  scoreChoisi(scoreA: number, scoreB: number){
    this.matchsEnCours.forEach(element => {
      if (element.id==this.selectionEnCours) {
        element.scoreA=scoreA;
        element.scoreB=scoreB;
        element.fini = true;
      }
    });
    this.selectionEnCours=-1
  }
}
