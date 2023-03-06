import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ronde',
  templateUrl: './ronde.component.html',
  styleUrls: ['./ronde.component.css']
})
export class RondeComponent implements OnInit {

  public numeroRonde: number = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
