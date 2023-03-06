import { Injectable } from '@angular/core';
import { JoueurI } from '../modeles/participants-i';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  public mesParticipants: JoueurI[] = []

  constructor() { }

  public lancementTournoi(mesJoueurs: JoueurI[]){
    this.mesParticipants = [];
    this.mesParticipants = mesJoueurs;
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

}
