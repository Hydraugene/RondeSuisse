import { Component, OnInit } from '@angular/core';
import { JoueurI, MatchI } from 'src/app/modeles/participants-i';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {



  constructor(public participantsService: ParticipantsService) { }

  ngOnInit(): void {
  }
  


}
