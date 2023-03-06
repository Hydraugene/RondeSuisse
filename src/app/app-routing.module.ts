import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ErreurRoutageComponent } from './pages/erreur-routage/erreur-routage.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RondeComponent } from './pages/ronde/ronde.component';
import { ScoreComponent } from './pages/score/score.component';

const routes: Routes = [
  {path:'',component:AcceuilComponent},
  {path:'inscription', component:InscriptionComponent},
  {path:'erreur-routage',component:ErreurRoutageComponent},
  {path:'ranking', component:RankingComponent},
  {path:'ronde', component:RondeComponent},
  {path:'score', component:ScoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
