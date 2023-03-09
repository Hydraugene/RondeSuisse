import { Injectable } from '@angular/core';
import { JoueurI, MatchI, RondeI } from '../modeles/participants-i';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  public mesParticipants: JoueurI[] = []
  public matchsEnCours: MatchI[] = []
  public tournoi: RondeI[]= []

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
    this.mesParticipants.sort((a,b)=>a.rang-b.rang)
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
    //forcer le bye à la fin du tableau
    if (a.estLeBye || b.estLeBye) {
      if (a.estLeBye) {
        return 1
      } else {
        return -1
      }
    } else {
      if (a.score-b.score==0) {
        return this.tiebreaker(a, b)
      } else {
        return b.score-a.score
      }      
    }
  }

  tiebreaker(joueurA:JoueurI, joueurB:JoueurI){
    //opponent match win %
    let joueurAomw : number =0
    let joueurBomw : number =0
    this.mesParticipants.forEach(element => {
      if (joueurA.adversaires.find(id => id==element.id)!=undefined) {
        joueurAomw+=(element.nbVictoire/element.adversaires.length)<0.33? 0.33 : element.nbVictoire/element.adversaires.length
      }
      if (joueurB.adversaires.find(id => id==element.id)!=undefined) {
        joueurBomw+=(element.nbVictoire/element.adversaires.length)<0.33? 0.33 : element.nbVictoire/element.adversaires.length
      }
    });
    
    if (joueurAomw/joueurA.adversaires.length!=joueurBomw/joueurB.adversaires.length) {
      return joueurBomw/joueurB.adversaires.length-joueurAomw/joueurA.adversaires.length
    } else {
      //Game win %
      if (joueurA.gameWin/joueurA.gamePlayed!=joueurB.gameWin/joueurB.gamePlayed) {
        return joueurB.gameWin/joueurB.gamePlayed-joueurA.gameWin/joueurA.gamePlayed
      } else {
        //opponent game win %
        let joueurAogw:number =0
        let joueurBogw:number =0
        this.mesParticipants.forEach(element => {
          if (joueurA.adversaires.find(id => id==element.id)!=undefined) {
            joueurAogw+=(element.gameWin/element.gamePlayed)<0.33? 0.33 : element.gameWin/element.gamePlayed
          }
          if (joueurB.adversaires.find(id => id==element.id)!=undefined) {
            joueurBogw+=(element.gameWin/element.gamePlayed)<0.33? 0.33 : element.gameWin/element.gamePlayed
          }
        });

        return (joueurBogw/joueurB.adversaires.length - joueurAogw/joueurA.adversaires.length)
      }
    }

  }

  public ajusterRangs(){
    //cette fonction de tri doit être améliorée
    // this.mesParticipants.sort((a,b)=> b.score-a.score)
    this.mesParticipants.sort((a,b)=> this.meilleurRang(a,b))
    let cpt: number = 0
    this.mesParticipants.forEach(element => {
      cpt++
      element.rang = cpt
    });
  }

  public randomizeOrder(){
    this.mesParticipants.forEach(element => {
      if (!element.estLeBye) {
        element.score = Math.floor(Math.random()*this.mesParticipants.length*10)+1     
      }
    });
    //this.ajusterRangs()
    this.mesParticipants.sort((a,b)=> b.score-a.score)
    let cpt: number = 0
    this.mesParticipants.forEach(element => {
      cpt++
      element.rang = cpt
    });

    this.mesParticipants.forEach(element => {
      if (!element.estLeBye) {
        element.score=0
      }
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
