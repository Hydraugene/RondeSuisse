import { Component, OnInit } from '@angular/core';
import { JoueurI, MatchI, RondeI } from 'src/app/modeles/participants-i';
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
      //calcul des scores et enregistrement des résultats sur les joueurs.
      this.matchsEnCours.forEach(element => {
        if (element.joueurA.estLeBye || element.joueurB.estLeBye) {
          if (element.joueurA.estLeBye) {
            element.joueurB.score+=3
            element.joueurB.nbVictoire++
          } else {
            element.joueurA.score+=3
            element.joueurA.nbVictoire++
          }
        } else {
          if (element.scoreA==element.scoreB) {
            element.joueurA.score++
            element.joueurA.nbNull++
            element.joueurB.score++
            element.joueurB.nbNull++
          } else {
            if (element.scoreA>element.scoreB) {
              element.joueurA.score+=3;
              element.joueurA.nbVictoire++
              element.joueurB.nbDefaite++
            } else {
              element.joueurA.nbDefaite++
              element.joueurB.score+=3
              element.joueurB.nbVictoire++              
            }
            
          }
          //enregistrement des scores
          element.joueurA.gameWin+=element.scoreA
          element.joueurA.gamePlayed+=element.scoreA+element.scoreB
          element.joueurB.gameWin+=element.scoreB
          element.joueurB.gamePlayed+=element.scoreA+element.scoreB
          //ajout de la mémoire des adversaires rencontrés
          element.joueurA.adversaires.push(element.joueurB.id)
          element.joueurB.adversaires.push(element.joueurA.id)
        }
        //enregistrement des joueurs
        this.participantsService.postParticipant(element.joueurA)
        this.participantsService.postParticipant(element.joueurB)
      });
      //Mise à jour du classement
      this.participantsService.ajusterRangs()
      //enregistrement de la ronde
      this.participantsService.tournoi.push({id: this.numeroRonde, matchs: this.matchsEnCours} as RondeI)
    }

  }

  public commencerRonde(){
    this.numeroRonde++;
    this.rondeEnCours=true
    // console.log(this.matchsEnCours)
    this.participantsService.setPairing()
    this.matchsEnCours = this.participantsService.getPairing()
    // console.log("ici"+this.matchsEnCours);
  }

  //permet de selectionner le match dont on veut enregistrer le score
  selectionnerScore(match: MatchI){
    this.selectionEnCours=match.id
  }

  //selection du résultat du match
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
