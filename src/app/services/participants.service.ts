import { Injectable } from '@angular/core';
import { JoueurI, MatchI } from '../modeles/participants-i';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  public mesParticipants: JoueurI[] = []
  public matchsEnCours: MatchI[] = []

  constructor() { }

  public lancementTournoi(mesJoueurs: JoueurI[]){
    this.mesParticipants = [];
    this.mesParticipants = mesJoueurs;
    //TODO shuffle
  }

  public getParticipant(id: number){
    return this.mesParticipants.find(joueur => joueur.id==id);
  }

  public postParticipant(participant: JoueurI){
    let index = this.mesParticipants.findIndex(joueur => joueur.id == participant.id)
    if (index != -1) {
      this.mesParticipants.splice(index, 1, participant) //a tester, je suis vraiment pas certain du résultat
    }
  }

  public getAllParticipants(){
    return this.mesParticipants
  }

  public setPairing(){
    this.matchsEnCours = []
    this.mesParticipants.sort((a,b)=>b.score-a.score)
    let cpt = this.mesParticipants.length/2;
    for (let index = 1; index < cpt+1; index++) {
      this.matchsEnCours.push({
        id: index,
        joueurA: this.mesParticipants[index*2-2],
        joueurB: this.mesParticipants[index*2-1],
        scoreA: 0,
        scoreB: 0,
        vainqueur: undefined,
        fini: false
      } as MatchI)
    }
    console.log("matchs : "+this.matchsEnCours);
  }

  public getPairing(){
    return this.matchsEnCours;
  }

}
