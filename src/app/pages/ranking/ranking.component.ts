import { Component, OnInit } from '@angular/core';
import { JoueurI } from 'src/app/modeles/participants-i';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public participants : JoueurI[] = []
  
  constructor(public participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.participants= this.participantsService.getAllParticipants();
  }
  adminChangerRang(rang: number, decalage: number){
    this.participantsService.adminChangerRang(rang, decalage);
  }
}
