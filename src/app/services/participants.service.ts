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
    this.randomizeOrder()
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

  //a terminer pour trier les rangs correctements
  meilleurRang(a: JoueurI, b: JoueurI){
    if (a.score-b.score==0) {
      //todo meilleur golaverage
      return 0
    } else {
      return a.score-b.score
    }
  }

  public ajusterRangs(){
    this.mesParticipants.sort((a,b)=> b.score-a.score)
    let cpt: number = 0
    this.mesParticipants.forEach(element => {
      cpt++
      element.rang = cpt
    });
  }

  public randomizeOrder(){
    this.mesParticipants.forEach(element => {
      element.score = Math.floor(Math.random()*this.mesParticipants.length*10)
    });
    this.ajusterRangs()
    this.mesParticipants.forEach(element => {
      element.score=0
    });
  }

  public adminChangerRang(rangAChanger: number, decalage: number){
    this.mesParticipants.forEach(element => {
      console.log(rangAChanger+" "+decalage)
      console.log("debut"+element)
      if (element.rang == rangAChanger) {
        element.rang+=decalage
      }else if (element.rang == rangAChanger+decalage) {
        element.rang = rangAChanger
      }
      console.log("fin"+element)
    });
    this.mesParticipants.sort((a,b)=>a.rang-b.rang)
  }

}
