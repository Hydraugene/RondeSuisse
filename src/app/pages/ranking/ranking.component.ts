import { Component, OnInit } from '@angular/core';
import { JoueurI } from 'src/app/joueur-i';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public participants : JoueurI[] = []
  constructor() { }

  ngOnInit(): void {
    var tmp : JoueurI = {
      'name':'toto',
      'rang':1,
      'points':6,
      'victoires':2,
      'defaites':0,
      'nuls':0
    }
    this.participants.push(tmp)
    var tmp2 : JoueurI = {
      'name':'Alphonse',
      'rang':2,
      'points':3,
      'victoires':1,
      'defaites':1,
      'nuls':0
    }
    this.participants.push(tmp2);
  }

}
